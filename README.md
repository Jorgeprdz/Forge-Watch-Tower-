# Forge Watch Tower

Independent, read-only auditor for [ForgeOS](https://github.com/Jorgeprdz/ForgeOS).

## Mission

Watch Tower observes ForgeOS from outside the product and produces reproducible evidence about repository health, governance availability, Council authority drift, and recent CI state.

**It never repairs ForgeOS.**

Canonical operating loop:

> Observe → Detect → Explain → Recommend → Evidence. Never Repair.

## V1 scope

- Reads the public ForgeOS GitHub API.
- Resolves the current `main` SHA.
- Verifies required constitutional/governance files are reachable.
- Checks the 13-seat Forge Council against canonical source text.
- Inspects recent GitHub Actions state on `main`.
- Produces Markdown + JSON reports.
- Runs manually or once per day in GitHub Actions.

## Hard boundary

Watch Tower has **no code path that writes to `Jorgeprdz/ForgeOS`**. The audit client only performs HTTP `GET` requests. Reports are created inside the Watch Tower runner and uploaded as Watch Tower artifacts.

## Run locally

```bash
node src/watchtower.mjs
```

Reports are written to `reports/`.

Optional environment variables:

```bash
FORGE_TARGET_REPO=Jorgeprdz/ForgeOS
FORGE_TARGET_BRANCH=main
```

## Interpreting the result

- `PASS`: no V1 blocking finding detected.
- `WARN`: audit completed but found drift, incomplete evidence, or a non-green CI signal.
- `FAIL`: a critical source, repository boundary, or target state could not be validated.

Watch Tower is evidence, not authority. Human review remains required before any repair, merge, migration, or deployment.
