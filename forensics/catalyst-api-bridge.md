# catalyst public api bridge

read-only public endpoints used for the isolated catalyst investigation.

- [pump metadata](https://frontend-api-v3.pump.fun/coins/5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump)
- [dexscreener pair](https://api.dexscreener.com/latest/dex/pairs/solana/58osDYARtvC5xy6GakQaBm16kDA4XwFyH4UfvtrjMvxj)
- [gmgn token trades](https://gmgn.ai/vas/api/v1/token_trades/sol/5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump?revert=true)
- [gmgn token trades limit](https://gmgn.ai/vas/api/v1/token_trades/sol/5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump?revert=true&limit=1000)
- [gmgn holders](https://gmgn.ai/vas/api/v1/token_holders/sol/5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump?orderby=amount_percentage&direction=desc&limit=100)
- [geckoterminal minute ohlcv page 1](https://api.geckoterminal.com/api/v2/networks/solana/pools/58osDYARtvC5xy6GakQaBm16kDA4XwFyH4UfvtrjMvxj/ohlcv/minute?aggregate=1&before_timestamp=1787351880&limit=1000&currency=usd&token=base)
- [solscan curve transactions](https://api-v2.solscan.io/v2/account/transaction?address=4rK2FRt2jjoAG4kBeUVotSZJxTAbYPEozdw3yJpKZhXi&page_size=100&sort=desc)
- [solscan curve transfers](https://api-v2.solscan.io/v2/account/transfer?address=4rK2FRt2jjoAG4kBeUVotSZJxTAbYPEozdw3yJpKZhXi&page=1&page_size=100&remove_spam=false&exclude_amount_zero=false&token=5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump)
- [solscan curve token-account transfers](https://api-v2.solscan.io/v2/account/transfer?address=ER4LPLA9c5iSEdyZK99QGgWM7dAx7hUii8Rpw27pCy97&page=1&page_size=100&remove_spam=false&exclude_amount_zero=false&token=5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump)
- [solscan curve dex activities](https://api-v2.solscan.io/v2/account/activity/dextrading?address=4rK2FRt2jjoAG4kBeUVotSZJxTAbYPEozdw3yJpKZhXi&page=1&page_size=100)
- [solscan pool dex activities](https://api-v2.solscan.io/v2/account/activity/dextrading?address=58osDYARtvC5xy6GakQaBm16kDA4XwFyH4UfvtrjMvxj&page=1&page_size=100)
