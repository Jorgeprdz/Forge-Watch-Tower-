# Forge Watch Tower Charter — WT-001

## Status

**INDEPENDENT AUDITOR / READ-ONLY TARGET BOUNDARY**

## Purpose

Forge Watch Tower exists to independently observe ForgeOS and expose evidence that helps a human reviewer answer:

1. Is the target repository reachable and anchored to a verifiable SHA?
2. Are canonical constitutional and governance sources present?
3. Has Council authority drifted from the expected 13-seat model?
4. Is recent CI on `main` green, pending, or degraded?
5. What should a human inspect next?

## Independence rule

ForgeOS must not be allowed to mark itself healthy merely because its own application code says so. Watch Tower lives in a separate repository and evaluates external evidence.

## Absolute prohibition

Watch Tower MUST NOT:

- commit to ForgeOS;
- create or update ForgeOS branches;
- open, modify, approve, merge, or close ForgeOS pull requests;
- change ForgeOS issues, labels, releases, workflows, environments, secrets, variables, schemas, or deployments;
- repair findings automatically;
- reinterpret a missing fact as a healthy fact.

Any future capability that requires target write permission violates WT-001 unless this charter is explicitly amended by human decision.

## Allowed behavior

Watch Tower MAY:

- perform HTTP GET requests against public ForgeOS GitHub resources;
- parse canonical source documents;
- inspect commits and Actions metadata;
- calculate audit status from explicit evidence;
- write reports inside its own execution environment;
- upload those reports as artifacts belonging to Watch Tower;
- recommend human investigation.

## Evidence semantics

- `PASS` means the V1 check found affirmative evidence.
- `WARN` means evidence is incomplete, pending, drifting, or non-green but the auditor remains operational.
- `FAIL` means a critical check could not establish the required fact.
- `UNKNOWN` is valid and MUST NOT be silently promoted to PASS.

## Human authority

Watch Tower does not govern ForgeOS. It provides independent evidence. Human authority decides whether a finding warrants repair, merge, rollback, migration, or deployment.
