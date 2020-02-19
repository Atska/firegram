const app = require("express")();
const functions = require("firebase-functions");
const Auth = require("./middlewares/auth");
// users
const SignUp = require("./db/users/signUp");
const signIn = require("./db/users/signIn");
const updateUserProfile = require("./db/users/updateUserProfile");
const getUserProfile = require("./db/users/getUserProfile");
const uploadProfilePicture = require("./db/users/uploadProfilePicture");
// posts
const addComment = require("./db/posts/addComment")
const addPost = require("./db/posts/addPost");
const getOnePost = require("./db/posts/getOnePost");
const getPosts = require("./db/posts/getPosts");
const like = require("./db/posts/like");
const unlike = require("./db/posts/unlike");

/**
 * ==========
 *   Users
 * ==========
 */

/**
 * User registration with validation and Json web token
 * user schema: {email, password, confirmPassword, handle}
 * @returns Set the User and his data in db and res.json the JWT
 * */
app.post("/signUp", SignUp);

/**
 * Enpoint for signing in with firebase functions
 * User logs in with {email, password}
 * @returns Json Web Token (JWT)
 */
app.post("/signIn", signIn);

/**
 * Endpoint for uploading the profile picture
 */
app.post("/uploadProfilePicture", Auth, uploadProfilePicture);

/**
 * Endpoint for updating user profile
 */
app.post("/user", Auth, updateUserProfile);

/**
 * Endpoint for getting user data
 */
app.get("/user", Auth, getUserProfile);

/**
 * ==========
 *   POSTS
 * ==========
 */

/**
 * Endpoint for adding posts using the firestore ADD function.
 * Schema for added posts = {message, userHandle, time}
 * Auth-Middleware to verify if it is the user and not a bad actor
 * @returns If successful, sends a callback res.json with post id
 */
app.post("/addPost", Auth, addPost);

/**
 * Endpoint for retrieving all posts in the db using Google functions.
 * Object composition: {postId, message, userHandle, time}
 * @returns json of all posts in an array
 */
app.get("/posts", getPosts);

/**
 * Enpoint for getting one post
 */
app.get("/post/:postID", getOnePost);

/**
 * Enpoint for commenting a post
 */
app.post("/post/:postID/comment", Auth, addComment);

/**
 * Enpoint for liking a post
 */
app.post("/post/:postID/like", Auth, like);

/**
 * Enpoint for unliking a post
 */
app.get("/post/:postID/unlike", Auth, unlike);

// Expose Express API as a single Cloud Function:
exports.api = functions.region("europe-west1").https.onRequest(app);

// https://firebase.google.com/docs/functions/get-started
// https://firebase.google.com/docs/reference/admin/node
// https://firebase.google.com/docs/functions/http-events

// Endpoints = https://europe-west1-sirenesongapp.cloudfunctions.net/api

// Best practise for express routing
//https://github.com/expressjs/express/tree/master/examples/route-separation

//https://googleapis.dev/nodejs/firestore/latest/index.html
