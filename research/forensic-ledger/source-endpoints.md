# $555 / RNDRNTWRK forensic ledger source registry

This branch reconstructs inception-to-date project capital from public chain evidence, project records, and provider receipts.

## Canonical identifiers

- $555 mint: `CQwwRomsuWsUCPYomZmRnwMns4ZCTASc31ExMvSysAF2`
- Pump creator / development wallet: `HW8jtVSXXyvt8AbbJ2knx2jjNeSSrLbpA1QkzLGZ5iWq`
- Streamflow lock: `HHXgYtezE32aATgWQFn3knAsy2xhQsjfepps3MLe3MXN`
- Streamflow lock: `BSkf98N8ppTciokTv56AFA8f6HU4Kux7Ee9DV63mUinQ`

## Public read-only sources

- [Streamflow contract HHXg](https://api-public.streamflow.finance/v2/api/contracts/tabularium/HHXgYtezE32aATgWQFn3knAsy2xhQsjfepps3MLe3MXN)
- [Streamflow contract BSkf](https://api-public.streamflow.finance/v2/api/contracts/tabularium/BSkf98N8ppTciokTv56AFA8f6HU4Kux7Ee9DV63mUinQ)
- [Streamflow application HHXg](https://app.streamflow.finance/contract/solana/mainnet/HHXgYtezE32aATgWQFn3knAsy2xhQsjfepps3MLe3MXN)
- [Streamflow application BSkf](https://app.streamflow.finance/contract/solana/mainnet/BSkf98N8ppTciokTv56AFA8f6HU4Kux7Ee9DV63mUinQ)
- [Creator wallet transaction history](https://api.solafon.com/api/wallet/transactions?address=HW8jtVSXXyvt8AbbJ2knx2jjNeSSrLbpA1QkzLGZ5iWq)
- [Creator wallet balance](https://api.solafon.com/api/wallet/balance?address=HW8jtVSXXyvt8AbbJ2knx2jjNeSSrLbpA1QkzLGZ5iWq)
- [Creator wallet on Solscan](https://solscan.io/account/HW8jtVSXXyvt8AbbJ2knx2jjNeSSrLbpA1QkzLGZ5iWq)
- [$555 token on Solscan](https://solscan.io/token/CQwwRomsuWsUCPYomZmRnwMns4ZCTASc31ExMvSysAF2)
- [ClaimScan creator-fee query](https://claimscan.tech/api/v2/fees?wallet=HW8jtVSXXyvt8AbbJ2knx2jjNeSSrLbpA1QkzLGZ5iWq)

## Accounting classification

- Creator fees: project inflow when claimed and settled.
- Buybacks: treasury asset acquisition; not operating expense.
- Streamflow locks: restricted treasury asset; not burn.
- Liquidity: restricted or recyclable capital; not ordinary burn.
- Chain fees, consumed provider services, tooling, audits, legal, contractors, distribution, and other development costs: expense.
- Internal transfers: eliminated.
- Founder contributions and external capital: financing inflows, not revenue.
