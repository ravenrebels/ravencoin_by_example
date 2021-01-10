const axios = require("axios");
const fs = require("fs");
if (!fs.existsSync("config.json")) {
  console.error(`create file config.json with rpcUsername, rcpPassword and asset
  for example
  {
    rpcUsername: "super",
    rpcPassword: "secret",
    asset: "BEER_TOKEN",
  };
  `);
}
const CONFIG = fs.readFileSync("config.json");

async function rpc(method, params) {
  const promise = new Promise((resolutionFunc, rejectionFunc) => {
    const options = {
      auth: {
        username: CONFIG.rpcUsername,
        password: CONFIG.rpcPassword,
      },
    };
    const data = {
      jsonrpc: "1.0",
      id: CONFIG.asset,
      method,
      params,
    };

    try {
      const rpcResponse = axios.post("http://127.0.0.1:8766", data, options);

      rpcResponse.then((re) => {
        const result = re.data.result;
        resolutionFunc(result);
      });
      rpcResponse.catch((e) => {
        rejectionFunc(e);
      });
    } catch (e) {
      rejectionFunc(e);
    }
  });
  return promise;
}

module.exports = rpc;
