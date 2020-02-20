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
const deleteOnePost = require("./db/posts/deleteOnePost");

/**
 * ==========
 *   Users
 * ==========
 */
app.post("/signUp", SignUp);
app.post("/signIn", signIn);
app.post("/uploadProfilePicture", Auth, uploadProfilePicture);
app.post("/user", Auth, updateUserProfile);
app.get("/user", Auth, getUserProfile);

/**
 * ==========
 *   POSTS
 * ==========
 */
app.post("/addPost", Auth, addPost);
app.get("/posts", getPosts);
app.get("/post/:postID", getOnePost);
app.delete("/post/:postID", Auth, deleteOnePost)
app.post("/post/:postID/comment", Auth, addComment);
app.post("/post/:postID/like", Auth, like);
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
