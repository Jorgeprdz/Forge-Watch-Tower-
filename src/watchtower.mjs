import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const config = JSON.parse(await fs.readFile(path.join(root, 'watchtower.config.json'), 'utf8'));

const targetRepo = process.env.FORGE_TARGET_REPO || config.target.repository;
const targetBranch = process.env.FORGE_TARGET_BRANCH || config.target.branch;
const [owner, repo] = targetRepo.split('/');
if (!owner || !repo) throw new Error(`Invalid target repository: ${targetRepo}`);

const apiBase = `https://api.github.com/repos/${owner}/${repo}`;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'Forge-Watch-Tower/1.0'
};

async function getJson(url) {
  const response = await fetch(url, { method: 'GET', headers });
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!response.ok) {
    const error = new Error(`GET ${url} -> ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return body;
}

async function getTextFile(filePath, ref) {
  const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
  const item = await getJson(`${apiBase}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`);
  if (!item || item.type !== 'file' || !item.content) throw new Error(`Not a readable file: ${filePath}`);
  return Buffer.from(item.content.replace(/\n/g, ''), 'base64').toString('utf8');
}

function finding(id, status, summary, evidence = {}) {
  return { id, status, summary, evidence };
}

function statusRank(status) {
  return { PASS: 0, UNKNOWN: 1, WARN: 2, FAIL: 3 }[status] ?? 3;
}

function overallStatus(findings) {
  const worst = findings.reduce((acc, item) => Math.max(acc, statusRank(item.status)), 0);
  return ['PASS', 'UNKNOWN', 'WARN', 'FAIL'][worst];
}

function score(findings) {
  if (!findings.length) return 0;
  const points = { PASS: 1, UNKNOWN: 0.5, WARN: 0.4, FAIL: 0 };
  return Math.round(100 * findings.reduce((sum, item) => sum + (points[item.status] ?? 0), 0) / findings.length);
}

const findings = [];
let targetSha = 'UNKNOWN';
let sourceText = '';

try {
  const repository = await getJson(apiBase);
  const branchOk = repository.default_branch === targetBranch;
  findings.push(finding(
    'REPOSITORY_BOUNDARY',
    branchOk ? 'PASS' : 'WARN',
    branchOk ? `Target reachable; default branch is ${targetBranch}.` : `Target reachable; default branch is ${repository.default_branch}, expected ${targetBranch}.`,
    { repository: repository.full_name, defaultBranch: repository.default_branch, visibility: repository.visibility }
  ));
} catch (error) {
  findings.push(finding('REPOSITORY_BOUNDARY', 'FAIL', 'Target repository could not be validated.', { error: error.message }));
}

try {
  const commit = await getJson(`${apiBase}/commits/${encodeURIComponent(targetBranch)}`);
  targetSha = commit.sha;
  findings.push(finding('MAIN_SHA', 'PASS', `Anchored audit to ${targetBranch}@${targetSha.slice(0, 12)}.`, { sha: targetSha }));
} catch (error) {
  findings.push(finding('MAIN_SHA', 'FAIL', `Could not resolve ${targetBranch} SHA.`, { error: error.message }));
}

const sourceResults = [];
for (const source of config.requiredSources) {
  try {
    const text = await getTextFile(source, targetSha === 'UNKNOWN' ? targetBranch : targetSha);
    sourceResults.push({ source, status: 'PASS', bytes: Buffer.byteLength(text) });
    sourceText += `\n${text}`;
  } catch (error) {
    sourceResults.push({ source, status: error.status === 404 ? 'FAIL' : 'WARN', error: error.message });
  }
}
const missingCritical = sourceResults.filter(item => item.status === 'FAIL');
const uncertainSources = sourceResults.filter(item => item.status === 'WARN');
findings.push(finding(
  'CANONICAL_SOURCES',
  missingCritical.length ? 'FAIL' : uncertainSources.length ? 'WARN' : 'PASS',
  missingCritical.length
    ? `${missingCritical.length} required canonical source(s) missing.`
    : uncertainSources.length
      ? `${uncertainSources.length} source(s) could not be fully validated.`
      : `All ${sourceResults.length} required canonical sources are reachable.`,
  { sources: sourceResults }
));

const councilResults = config.council.map(seat => ({
  seat: seat.name,
  present: seat.aliases.some(alias => sourceText.includes(alias))
}));
const missingSeats = councilResults.filter(item => !item.present);
findings.push(finding(
  'COUNCIL_AUTHORITY',
  missingSeats.length ? 'WARN' : 'PASS',
  missingSeats.length
    ? `${missingSeats.length} expected Council seat(s) were not found in canonical source text.`
    : `All ${councilResults.length} expected Council seats were found.`,
  { expectedSeats: councilResults.length, seats: councilResults }
));

try {
  const runs = await getJson(`${apiBase}/actions/runs?branch=${encodeURIComponent(targetBranch)}&per_page=10`);
  const list = runs.workflow_runs || [];
  if (!list.length) {
    findings.push(finding('RECENT_CI', 'UNKNOWN', `No recent Actions runs found for ${targetBranch}.`));
  } else {
    const latest = list[0];
    const ciStatus = latest.status !== 'completed'
      ? 'WARN'
      : latest.conclusion === 'success'
        ? 'PASS'
        : 'WARN';
    findings.push(finding(
      'RECENT_CI',
      ciStatus,
      latest.status !== 'completed'
        ? `Latest workflow is ${latest.status}.`
        : `Latest workflow concluded ${latest.conclusion}.`,
      {
        workflow: latest.name,
        event: latest.event,
        status: latest.status,
        conclusion: latest.conclusion,
        headSha: latest.head_sha,
        url: latest.html_url,
        createdAt: latest.created_at
      }
    ));
  }
} catch (error) {
  findings.push(finding('RECENT_CI', 'UNKNOWN', 'Recent Actions state could not be read.', { error: error.message }));
}

const report = {
  watchtowerVersion: config.version,
  generatedAt: new Date().toISOString(),
  target: { repository: targetRepo, branch: targetBranch, sha: targetSha },
  boundary: { targetWriteAllowed: false, transport: 'GitHub REST GET only' },
  status: overallStatus(findings),
  score: score(findings),
  findings
};

const lines = [
  '# Forge Watch Tower — Audit Report',
  '',
  `- Generated: ${report.generatedAt}`,
  `- Target: \`${targetRepo}\``,
  `- Branch: \`${targetBranch}\``,
  `- SHA: \`${targetSha}\``,
  `- Status: **${report.status}**`,
  `- V1 score: **${report.score}/100**`,
  `- Target write permission: **NO**`,
  '',
  '## Findings',
  ''
];

for (const item of findings) {
  lines.push(`### ${item.status} — ${item.id}`);
  lines.push('');
  lines.push(item.summary);
  lines.push('');
}

lines.push('## Boundary');
lines.push('');
lines.push('Watch Tower only observes and reports. Any repair, merge, migration, or deployment requires separate human-authorized action outside this auditor.');
lines.push('');

await fs.mkdir(path.join(root, 'reports'), { recursive: true });
await fs.writeFile(path.join(root, 'reports', 'latest.json'), `${JSON.stringify(report, null, 2)}\n`);
await fs.writeFile(path.join(root, 'reports', 'latest.md'), `${lines.join('\n')}\n`);

console.log(lines.join('\n'));
process.exitCode = report.status === 'FAIL' ? 2 : 0;
