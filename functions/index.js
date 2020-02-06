const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const firebase = require("firebase");

// Initialize Admin SDK
const serviceAccount = require("./credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sirenesongapp.firebaseio.com"
});
const db = admin.firestore();

/** project configs (unique, but no secret) from the project settings. May have to be updated */
const firebaseConfig = {
  apiKey: "AIzaSyDaPtQoxz3aDTgLyC3m2iY1ODD2TZzLfo4",
  authDomain: "sirenesongapp.firebaseapp.com",
  databaseURL: "https://sirenesongapp.firebaseio.com",
  projectId: "sirenesongapp",
  storageBucket: "sirenesongapp.appspot.com",
  messagingSenderId: "691616626289",
  appId: "1:691616626289:web:a6bf28b557bb7f3978cdd0",
  measurementId: "G-P7QSR9X1B0"
};
// Initialize firebase application
firebase.initializeApp(firebaseConfig);

/** Endpoint for adding posts using the firestore ADD function. */
app.post("/addPosts", (request, response) => {
  // Username and message. Time will be automatically added
  const postSchema = {
    message: request.body.message,
    userHandle: request.body.userHandle,
    time: new Date().toISOString()
  };
  // Using the postSchema, post data into the db
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

/** Endpoint for retrieving all posts in the db. */
app.get("/getPosts", (request, response) => {
  // "Posts" is the name of the database (collection in firebase)
  // Get all the data from the noSql db and store them in an array. Return json object
  db.collection("Posts")
    .orderBy("time", "desc")
    .get()
    .then(results => {
      const posts = [];
      // result.data() is a json object
      results.forEach(result => {
        posts.push({
          postID: result.id,
          message: result.data().message,
          userHandle: result.data().userHandle,
          time: result.data().time
        });
      });
      return response.status(200).json(posts);
    })
    .catch(error => {
      console.log("Error getting documents", error);
    });
});

/** User registration with Json web token*/
app.post("/signup", (request, response) => {
  // schema for user registration
  const userSchema = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle
  };

  // Variables used later
  let userId;
  let token;
  //
  db.doc(`/Users/${userSchema.handle}`)
    .get()
    // Check if the requested handle is taken
    // If not firebase creates the user
    .then(documentPath => {
      if (documentPath.exists) {
        return response.status(403).json({ handle: "Handle already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            userSchema.email,
            userSchema.password
          );
      }
    })
    //
    // Return a Json Web Token to identify the user to firebase services
    // Return the current token if not expired
    .then(createdUser => {
      userId = createdUser.user.uid;
      return createdUser.user.getIdToken();
    })
    // Create a document with the user infomation and the handle as
    // unique identifier
    .then(JWT => {
      token = JWT;
      const userInfo = {
        userId,
        email: userSchema.email,
        handle: userSchema.handle,
        time: new Date().toISOString()
      };
      return db.doc(`/Users/${userSchema.handle}`).set(userInfo);
    })
    // Resolves the promise and send the token
    .then(() => response.status(201).json({ token }))
    .catch(error => {
      // cloud function has special error codes, checks automatically if email is taken
      console.log(error.code);
      console.log(error.message);
      response.status(500).json({ error: error.code });
    });
});

app.post("/signin", (response, request) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(request.body.email, request.body.password)
    .then(result =>
      response
        .status(200)
        .json({ message: `User ${result.user.uid} has signed in.` })
    )
    .catch(error => {
      // cloud function has special error codes, checks automatically if email is taken
      console.log(error.code);
      console.log(error.message);
      response.status(500).json({ error: error.code });
    });
});

// Expose Express API as a single Cloud Function:
exports.api = functions.region("europe-west1").https.onRequest(app);

// https://firebase.google.com/docs/functions/get-started
// https://firebase.google.com/docs/reference/admin/node
// https://firebase.google.com/docs/functions/http-events

// Endpoints = https://europe-west1-sirenesongapp.cloudfunctions.net/api
