const axios = require("axios");
const baseURL = 'http://127.0.0.1:8080';
const acc = process.argv[2];
const depth = process.argv[3];
const url = `${baseURL}/accounts/${acc}/staking-payouts?depth=${depth}&unclaimedOnly=true`;

async function getData() {
  try {
    console.log(`requesting pending payouts for account :${acc} and depth: ${depth}...`);  
    let total = 0
    const { data } = await axios.get(url);
    for (let {payouts} of data.erasPayouts) {
        for (let {nominatorStakingPayout} of payouts) {
            total = total + Number(nominatorStakingPayout);
        }
    }  

    console.log("pending payouts (Planck):", total);
    console.log("pending payouts (KSM):", total / Math.pow(10, 12));
  } catch (err) {
    console.log('error:', err);
  }
}
getData();