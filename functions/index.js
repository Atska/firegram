// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
const express = require("express");
// Initialize on Cloud Functions
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

const app = express();


// Add data with POST method using the firestore ADD function.
app.post("/addPosts", (request, response) => {
  // Username and message. Time will be automatically added
  let postSchema = {
    message: request.body.message,
    userHandle: request.body.userHandle,
    time: new Date().toISOString()
  };
  //
  db.collection("Posts")
    .add(postSchema)
    .then(reference =>
      response
        .status(200)
        .json({ message: `Added document with ID: ${reference.id}` })
    )
    .catch(error => {
      response.status(500).json({ error: "Error sending document.." });
      console.log("Error sending document", error);
    });
});

// Read the data in the database with GET method with Firestore Cloud functions
app.get("/getPosts", (request, response) => {
  db.collection("Posts")
    .orderBy("time", "desc")
    .get()
    .then(results => {
      let posts = [];
      // result.data() is a json object
      results.forEach(result => {
        posts.push({
          postID: result.id,
        message: result.data().message,
        userHandle: result.data().userHandle,
        time: result.data().time
        }
        );
      });
      return response.status(200).json(posts);
    })
    .catch(error => {
      console.log("Error getting documents", error);
    });
});

// Expose Express API as a single Cloud Function:
exports.api = functions.region("europe-west1").https.onRequest(app);

// https://firebase.google.com/docs/functions/get-started
// https://firebase.google.com/docs/reference/admin/node
// https://firebase.google.com/docs/functions/http-events

// Endpoints = https://europe-west1-sirenesongapp.cloudfunctions.net/api
