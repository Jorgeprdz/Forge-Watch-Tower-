# CCZH1 `target.h` requirements matrix

Target: `SM-S931B / pa1q / S931BXXSCCZH1`

This is a value-free acceptance matrix for a future exact `target.h`. It records what is already verified, what has only structural evidence, and what remains blocking. It does not publish addresses, offsets, candidate values, or exploit parameters.

| Requirement | Current state | Exact CCZH1 support | Acceptance condition | Gate |
|---|---|---:|---|---|
| Model / codename / firmware / build fingerprint | Verified exact | Yes | Must remain the exact SM-S931B / pa1q / CCZH1 target | PASS |
| Kernel identity | Hash-verified exact | Yes | Must match the verified CCZH1 kernel | PASS |
| Embedded BTF identity | Hash-verified exact | Yes | Must come from the same verified CCZH1 kernel | PASS |
| Recovered ELF identity | Hash-verified exact | Yes | Must match the verified CCZH1 reconstruction | PASS |
| Symbol inventory identity | Hash-verified exact | Yes | Must match the exact CCZH1 symbol inventory | PASS |
| Foreign-family fallback | Active reference count 0 after remediation | Yes | No pa2q / pa3q / S938N family fallback accepted as evidence | PASS |
| Exact verified `target.h` | Not present | Partial | A maintainer-verified exact `pa1q-S931BXXSCCZH1` header is required | BLOCKING |
| `P0_PAGE_OFFSET` | Unresolved | No name-only support | Exact CCZH1-specific verified value required; no family substitution | BLOCKING |
| `P0_PHYS_OFFSET` | Unresolved | No name-only support | Exact CCZH1-specific verified value required; no family substitution | BLOCKING |
| `P0_KERNEL_PHYS_LOAD` | Unresolved | No name-only support | Exact CCZH1-specific verified value required; no family substitution | BLOCKING |
| `SLIDE_TRACEFS_WORKER_CALLER_OFF` | Structural-name evidence present | Partial | Exact CCZH1-specific verified value required; structural presence alone is insufficient | BLOCKING |
| `SLIDE_NFULNL_LOGGER_OBJECT_OFF` | Structural-name evidence present | Partial | Exact CCZH1-specific verified value required; structural presence alone is insufficient | BLOCKING |
| `SLIDE_RANDOM_TABLE_BOOT_ID_DATA_PTR_OFF` | Structural-name evidence present | Partial | Exact CCZH1-specific verified value required; structural presence alone is insufficient | BLOCKING |
| `SLIDE_SYSCTL_BOOTID_OFF` | Structural-name evidence present | Partial | Exact CCZH1-specific verified value required; structural presence alone is insufficient | BLOCKING |
| Profile status | `UNRESOLVED` | Yes | Must stay unresolved while any blocking exact-profile requirement remains open | BLOCKING |
| Activation gate | `EXACT_DEVICE_PROFILE_REQUIRED` | Yes | Must remain fail-closed until exact target requirements are satisfied | PASS |
| Profile derivation workflow | Disabled | Yes | Remain disabled while the exact header is unresolved | PASS |
| Candidate payload compilation | Disabled | Yes | Remain disabled while any blocking target requirement is unresolved | PASS |
| `ROOT_PROFILE_COMPLETE` | `NO` | Yes | May become `YES` only after all blocking rows are exact-target verified | BLOCKING |
| `TARGET_H_VERIFIED` | `NO` | Yes | May become `YES` only for an exact maintainer-verified CCZH1 header | BLOCKING |
| `EXPLOIT_READY` | `NO` | Yes | Not declared by this static/provenance evidence package | BLOCKING |

Machine-readable copy: `TARGET-H-REQUIREMENTS-MATRIX.tsv`.
