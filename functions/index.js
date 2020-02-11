const app = require("express")();
const functions = require("firebase-functions");
const SignUp = require("./db/users/SignUp");
const SignIn = require("./db/users/SignIn");
const addPost = require("./db/posts/addPost");
const getPosts = require("./db/posts/getPosts");
const Auth = require("./middlewares/auth")

// users: Registration, LoginIn, Authentication
/**
 * User registration with validation and Json web token
 * user schema: {email, password, confirmPassword, handle}
 * @returns Set the User and his data in db and res.json the JWT
 * */
app.post("/SignUp", SignUp);

/**
 * Enpoint for signing in with firebase functions
 * User logs in with {email, password}
 * @returns Json Web Token (JWT)
 */
app.post("/SignIn", SignIn);

// posts: Get all posts and add one post
/**
 * Endpoint for adding posts using the firestore ADD function.
 * Schema for added posts = {message, userHandle, time}
 * Auth-Middleware to verify if it is the user and not a bad actor
 * @returns If successful, sends a callback res.json with post id
 */
app.post("/AddPost", Auth, addPost);

/**
 * Endpoint for retrieving all posts in the db using Google functions.
 * Object composition: {postId, message, userHandle, time}
 * @returns json of all posts in an array
 */
app.get("/GetPosts", getPosts);

// Expose Express API as a single Cloud Function:
exports.api = functions.region("europe-west1").https.onRequest(app);

// https://firebase.google.com/docs/functions/get-started
// https://firebase.google.com/docs/reference/admin/node
// https://firebase.google.com/docs/functions/http-events

// Endpoints = https://europe-west1-sirenesongapp.cloudfunctions.net/api

// Best practise for express routing
//https://github.com/expressjs/express/tree/master/examples/route-separation
