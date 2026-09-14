# GalaxyRoot Exact — SM-S931B / pa1q / S931BXXSCCZH1

Public evidence index for the exact Samsung Galaxy S25 base-model build `S931BXXSCCZH1`.

## Exact target

- Model: `SM-S931B`
- Codename: `pa1q`
- Firmware: `S931BXXSCCZH1`
- Fingerprint: `samsung/pa1qxxx/pa1q:16/BP4A.251205.006/S931BXXSCCZH1_OWOCCZH1:user/release-keys`
- Kernel release: `6.6.98-android15-8-pd6ff1cd-abogkiS931BXXSCCZH1-4k`
- Kernel size: `38,849,024` bytes
- Kernel SHA-256: `3f78b1be1d763ed9ac5a14d6d1d169e8d8801bb2c006b39835e3f0b863f1bca5`
- Embedded BTF size: `6,386,356` bytes
- Embedded BTF SHA-256: `c3a0fbfeff1410502ab4624c906908a8d176a763c8835d5dfaffe33a3ece3e36`
- Recovered `vmlinux.elf` SHA-256: `6a9ebc8eea16d0661044926266699c9e5bbea29f4674c9ee7d729c233d3446a4`
- `vmlinux.nm` SHA-256: `a720361182270bf21361c6c36d898782b1ace1a426019fb8f2788ff523126b25`

## Provenance chain

`Samsung firmware S931BXXSCCZH1 -> exact AP -> boot.img.lz4 -> boot.img -> raw kernel -> embedded BTF / recovered ELF / symbol inventory`

No `pa3q` / `S938N` profile values are treated as evidence for this target.

## Provenance-remediation note

The first public static audit intentionally recorded foreign-family references that existed in the local profile-generation tooling. Those references were classified as forbidden evidence, not accepted as CCZH1 facts.

A later local remediation pass (`V3`, 2026-09-14 15:40 -06:00) removed the active foreign-family fallback/proximity/cross-target paths and disabled both profile derivation and candidate-payload compilation while the exact profile remains unresolved.

Current post-remediation status:

- Foreign-reference count in the two remediated files: `0`
- Legacy family fallback: disabled
- Legacy proximity hint: disabled
- Cross-target textual substitution: disabled
- Exact-reference handling: fail-closed
- Profile derivation step: disabled
- Payload compile step: disabled
- Missing exact values: remain `UNRESOLVED`
- Exact verified `target.h`: still `NO`
- Root profile complete: `NO`
- Exploit ready: `NO`

`FORBIDDEN-FAMILY-REFERENCES.txt` is retained as a **pre-remediation historical finding**, not as a statement of the current local code state.

## Public reports

- `SUMMARY.txt` — current static-analysis + remediation status.
- `STATIC-PROVENANCE-REPORT.txt` — exact kernel/BTF identity and provenance status.
- `POST-REMEDIATION-V3.txt` — post-remediation gate summary.
- `STATIC-NAME-COVERAGE.txt` — hash-gated exact CCZH1 name-only structural coverage; no addresses or offsets.
- `TARGET-H-REQUIREMENTS-MATRIX.tsv` — minimum exact-target acceptance matrix for a future `target.h`; blocking fields remain value-free and unresolved here.
- `CCZH1-PROVENANCE-AUDIT.tsv` — original field-by-field provenance classification.
- `TARGET-H-AUDIT.tsv` — exact target header availability audit.
- `UNRESOLVED-STATUS.tsv` — remaining profile gaps and classifications.
- `FORBIDDEN-FAMILY-REFERENCES.txt` — pre-remediation foreign-family contamination snapshot.
- `ARTIFACT-MANIFEST.txt` — canonical package member hashes/sizes; see its scope note.

## Verified package

Canonical static-input package SHA-256:

`909c15f1478a150549f5c44637804f06df6030d91882929d49692327328dffc5`

The release asset contains exact static-analysis inputs and provenance material, not a root payload or exploit execution artifact.

Important: hashes/sizes in `ARTIFACT-MANIFEST.txt` describe the **canonical packaged artifacts**. Some text reports mirrored in this Git branch are public/sanitized or subsequently updated documentation and therefore are not expected to byte-match the package members.

## Current state

- Static identity/provenance: `PASS`
- Exact CCZH1 kernel/BTF/ELF/symbol inventory: verified
- Static name-only structural coverage: complete for the audited named components
- Target-header requirements matrix: published
- Pre-remediation foreign-family contamination: `FOUND` and rejected as evidence
- Post-remediation active foreign-reference count: `0`
- Foreign-family fallback accepted as evidence: `NO`
- Exact verified `target.h`: `NO`
- Root profile complete: `NO`
- Exploit ready: `NO`

Upstream request: https://github.com/BuSung-dev/Root-My-Galaxy-Payloads/issues/337
