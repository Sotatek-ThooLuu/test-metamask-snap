const { getCaverFunction } = require('./caverHelper');

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello': {
      const fees = JSON.parse(await getFees());
      const baseFee = parseFloat(fees.currentBaseFee);
      const safeLow = Math.ceil(baseFee + parseFloat(fees.safeLow));
      const standard = Math.ceil(baseFee + parseFloat(fees.standard));
      const fastest = Math.ceil(baseFee + parseFloat(fees.fastest));
      const caverVersion = await getCaverFunction();

      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Gas Fees`,
            description: 'Current Gas Fees from etherchain.org:',
            textAreaContent: `Low: ${safeLow}\n
              Average: ${standard}\n
              High: ${fastest}\n
              Caver version: ${caverVersion}
              `,
          },
        ],
      });
    }
    default:
      throw new Error('Method not found.');
  }
});

async function getFees() {
  const response = await fetch('https://www.etherchain.org/api/gasPriceOracle');
  return response.text();
}
