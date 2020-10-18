const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
    const params = process.argv.slice(2)
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    const chain = await api.rpc.system.chain();
    if (params[0] === 'hash') {
        const block = await api.rpc.chain.getBlock(params[1])
        console.log(`Block number for hash: ${params[1]} is: ${block.block.header.number}, full block: ${block.block}`)
      }else{
        const lastHeader = await api.rpc.chain.getHeader();
        console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`)
        console.log(`Full head info: ${lastHeader}`)
      }


}

main()
.catch(console.error)    
.then(() => process.exit(0))