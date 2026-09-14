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

## Public reports

- `SUMMARY.txt` — final static-analysis status.
- `STATIC-PROVENANCE-REPORT.txt` — exact kernel/BTF identity and safe-analysis status.
- `CCZH1-PROVENANCE-AUDIT.tsv` — field-by-field provenance classification.
- `TARGET-H-AUDIT.tsv` — exact target header availability audit.
- `UNRESOLVED-STATUS.tsv` — remaining profile gaps and classifications.
- `FORBIDDEN-FAMILY-REFERENCES.txt` — foreign-family contamination audit.
- `ARTIFACT-MANIFEST.txt` — hashes, sizes, and purposes of the recovered evidence.

## Verified package

Canonical static-input package SHA-256:

`909c15f1478a150549f5c44637804f06df6030d91882929d49692327328dffc5`

The public binary release asset is intended to contain only exact static-analysis inputs and provenance material, not a root payload or exploit execution artifact.

## Current state

- Static identity/provenance: `PASS`
- Exact CCZH1 kernel/BTF/ELF/symbol inventory: verified
- Foreign-family fallback accepted as evidence: `NO`
- Exact verified `target.h`: `NO`
- Root profile complete: `NO`
- Exploit ready: `NO`

Upstream request: https://github.com/BuSung-dev/Root-My-Galaxy-Payloads/issues/337
