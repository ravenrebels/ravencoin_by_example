const axios = require("axios");
const fs = require("fs");

const CONFIG = getConfig();

rpc("listaddressesbyasset", [CONFIG.asset])
  .then(function (data) {
    console.log("Holders of", CONFIG.asset);
    console.table(data);
  })
  .catch(function (e) {
    console.error(e.message);
  });

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

function getConfig() {
  let config = null;
  for (const argument of process.argv) {
    if (argument.startsWith("configfile=") === true) {
      const fileName = argument.replace("configfile=", "");
      if (fs.existsSync(fileName) === false) {
        console.error("Could not locate file", fileName);
        process.exit(1);
      }
      config = JSON.parse(fs.readFileSync(fileName, "utf8"));
    }
  }

  if (config === null) {
    const message = `Could not locate the config file.
    Please start this app with "node index configfile=FILE_PATH"
    
    The config file should look like
    
    {
      "rpcUsername": "YOUR_USERNAME",
      "rpcPassword": "YOUR VERY SECRET PASSWORD",  
      "asset": "YOUR COOL ASSET"
    }
    
    `;
    console.error(message);
    process.exit(1);
  }

  return config;
}
