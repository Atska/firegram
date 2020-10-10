const app = require("express")();
const Auth = require("./middlewares/auth");
const cors = require("cors");
// users
const signUp = require("./db/users/signUp");
const signIn = require("./db/users/signIn");
const updateUserProfile = require("./db/users/updateUserProfile");
const getUserProfile = require("./db/users/getUserProfile");
const uploadProfilePicture = require("./db/users/uploadProfilePicture");
const getOtherUserProfile = require("./db/users/getOtherUserProfile");
const follow = require("./db/users/follow");
const unfollow = require("./db/users/unfollow");
// posts
const addComment = require("./db/posts/addComment");
const addPost = require("./db/posts/addPost");
const getOnePost = require("./db/posts/getOnePost");
const getPosts = require("./db/posts/getPosts");
const like = require("./db/posts/like");
const unlike = require("./db/posts/unlike");
const deleteOnePost = require("./db/posts/deleteOnePost");

app.use(cors());

/**
 * ==========
 *   Users
 * ==========
 */
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/uploadProfilePicture", Auth, uploadProfilePicture);
app.post("/user", Auth, updateUserProfile);
app.post("/user/:handle/follow", Auth, follow);
app.post("/user/:handle/unfollow", Auth, unfollow);
app.get("/user", Auth, getUserProfile);
app.get("/user/:handle", Auth, getOtherUserProfile);

/**
 * ==========
 *   POSTS
 * ==========
 */
app.post("/addPost", Auth, addPost);
app.post("/post/:postID/comment", Auth, addComment);
app.post("/post/:postID/like", Auth, like);
app.get("/posts",  getPosts);
app.get("/post/:postID", getOnePost);
app.post("/post/:postID/unlike", Auth, unlike);
app.delete("/post/:postID", Auth, deleteOnePost);
