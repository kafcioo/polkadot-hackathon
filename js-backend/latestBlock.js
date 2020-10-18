const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    const chain = await api.rpc.system.chain();
    const lastHeader = await api.rpc.chain.getHeader();
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`)
    console.log(`Full head info: ${lastHeader}`)

}

main()
.catch(console.error)    
.then(() => process.exit(0))