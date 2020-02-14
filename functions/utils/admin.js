const admin = require("firebase-admin");

// Initialize Admin SDK
// credetials are private data 
const serviceAccount = require("../credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sirenesongapp.firebaseio.com",
  storageBucket: "sirenesongapp.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };
