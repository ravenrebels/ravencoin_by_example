var admin = require("firebase-admin");

var serviceAccount = require("../beer-token.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beer-token-default-rtdb.europe-west1.firebasedatabase.app"
});

var db = admin.database();
var ref = db.ref("elvis");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());  
});

const promise = admin.auth().listUsers();
promise.then(function(data){
    const users = data.users;
    console.table(users);
})

db.goOffline();

