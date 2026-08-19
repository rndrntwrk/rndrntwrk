# Hunting Time — Checkpoint 01 report

**Checkpoint:** 01 — Escrow, oracle, and artifact integrity  
**Status:** COMPLETE  
**Checked:** August 19, 2026 at 06:14:07 UTC  
**Checked in America/Chicago:** August 19, 2026 at 01:14:07 AM CDT

## Incentive status

The puzzle originally offered **420,000 satoshis (0.0042 BTC)**.

That incentive is now **no longer claimable from the published prize address**. Both 210,000-sat outputs were spent in one confirmed transaction:

```text
d3783a1cde2c491a6edfbead81aeebda90257c8c25b4b0c9b2bac89bc5cd607a
```

The sweep confirmed in Bitcoin block **962971** on **August 18, 2026 at 02:07:20 UTC** (**August 17, 2026 at 09:07:20 PM CDT**).

The transaction consumed both prize UTXOs, totaling **420,000 sats**, paid a **358-sat fee**, and sent **419,642 sats** to:

```text
3KBUSqmnxCDspUYe5HwskVvTbLfs5baeXb
```

The on-chain record proves that someone controlled the private key. It does not, by itself, prove whether that party was an independent solver or the puzzle author.

## Inputs frozen

- Target address: `bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85`
- Original incentive: 420,000 sats / 0.0042 BTC
- Current balance: **0 sats**
- Current UTXOs: **0**
- Primary wallet model: Electrum native segwit
- Primary receiving path: `m/0'/0/i`
- Original clue photographs: 12

## Work completed

- Queried **mempool.space** and **Blockstream Esplora** directly.
- Compared normalized address summaries and UTXO sets.
- Confirmed both services report the same zero-balance, zero-UTXO state.
- Ran the official BIP84 test vector through the independent oracle.
- Ran Electrum's fixed mnemonic/PBKDF2/version vector through the independent oracle.
- Pinned and checked official Electrum source commit `bc37f9c5293a121bed6955a3ce6c152d14695fd0`.
- Verified all twelve original photograph hashes.
- Hashed 27 canonical evidence and oracle artifacts.
- Audited prior result data for a private or exact-match artifact.
- Generated no candidate phrases and ran no puzzle search.

## Live escrow result

| Field | Result |
|---|---:|
| Confirmed balance | 0 sats |
| Pending balance | 0 sats |
| UTXOs | 0 |
| Total funded | 420,000 sats |
| Total spent | 420,000 sats |
| Confirmed transactions | 3 |
| Independent explorers agree | Yes |
| Original reward still present | No |

## Oracle verification

- Official BIP84 vector: **PASS**
- Electrum fixed seed/PBKDF2 vector: **PASS**
- Electrum version prefix `100`: **PASS**
- Official Electrum derivation source `m/0'/`: **PASS**
- Independent first receiving path: `m/0'/0/0`
- Independent vector address: `bc1q4794m2uuw9jmjszmplfj4wvvr5j272fpnx2cse`

## Integrity and private-match audit

- Original clue hashes: **12/12 PASS**
- Canonical artifacts hashed: **27**
- Suspicious private-match filenames: **0**
- Files containing a positive exact-match marker: **0**
- Private-match audit: **PASS**

## Exact-match result

**This effort did not recover the mnemonic or produce an exact target-address match.** Checkpoint 01 deliberately ran no candidate search.

## Classification change

The original puzzle should no longer be treated as an open, economically claimable 420,000-sat target. Its on-chain state is now:

```text
FUNDED → SWEPT
```

Further work can still reconstruct the solution for research or attribution, but the monetary incentive is currently **0 sats** unless the author announces a new bounty or replacement address.

## Revised next checkpoint

**Checkpoint 02A — Claim attribution and public-solution verification**

Bounded scope:

1. Establish whether the author announced a winner or withdrawal.
2. Search for a published mnemonic, method, or solver proof without exposing private material unnecessarily.
3. Determine whether the destination address is publicly attributable.
4. Check for a replacement bounty or new prize address.
5. Decide whether the original twelve-clue reconstruction remains worth pursuing.

Checkpoint 02, the full twelve-clue evidence matrix, is paused until 02A resolves the campaign's disposition.
