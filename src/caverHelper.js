const Caver = require('caver-js');

const getCaverFunction = async () => {
  const caver = new Caver('https://public-node-api.klaytnapi.com/v1/baobab');
  const caverVersion = await caver.rpc.klay.getClientVersion();
  console.log(`---caver version:`, caverVersion);
  return caverVersion || 'test';
};

module.exports = {
  getCaverFunction,
};
