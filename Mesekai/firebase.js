const firebase = require("firebase-admin");
const serviceAccount = require("./service-account.json");

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });
}

export default firebase;
