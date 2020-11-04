* 1) get substrate-api-sidecar from https://github.com/paritytech/substrate-api-sidecar#configuration
* 2) run kusaman node ./target/release/polkadot --chain=kusama
* 3) inside sidecar folder run yarn and than NODE_ENV=kusama yarn start to start it, (make sure you have kusama node runing and its in sync)
* 4) get validator from https://kusama.subscan.io/validator 
* 5) run the get-pending-payouts script like so- node get-pending-payouts.js EQBwtmKWCyRrQ8yGWg7LkB8p7hpEKXZz4qUg9WR8hZmieCM 10




