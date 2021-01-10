const admin = require("firebase-admin");
const rpc = require("./ravenRPC");
const { isEqual } = require("lodash");
const serviceAccount = require("../beer-token.json"); //Super secret stuff we export from firebase>project tools>service key

let cache = {};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://beer-token-default-rtdb.europe-west1.firebasedatabase.app",
});

async function hardWork() {
  const beerTokenAddresses = await rpc("listaddressesbyasset", ["BEER_TOKEN"]);

  //Just return if nothing has happened on the network
  if (isEqual(cache, beerTokenAddresses) === true) {
    console.log("No update", new Date().toLocaleTimeString());
  } else {
    cache = beerTokenAddresses;
    const db = admin.database();

    const ref = db.ref("addresses");
    ref.set(beerTokenAddresses);
    ref.once("value", function (snapshot) {
      console.log(snapshot.val());
    });
  }

  setTimeout(hardWork, 3000);
}

hardWork();
