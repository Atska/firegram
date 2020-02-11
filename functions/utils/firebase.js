const firebase = require("firebase");
const firebaseConfig = require("./firebaseConfig")
firebase.initializeApp(firebaseConfig);

module.exports = firebase;