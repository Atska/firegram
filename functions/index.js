const app = require("express")();
const functions = require("firebase-functions");
const Auth = require("./middlewares/auth");
const { db } = require("./utils/admin");
// users
const SignUp = require("./db/users/signUp");
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

/**
 * ==========
 *   Users
 * ==========
 */
app.post("/signUp", SignUp);
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
app.get("/posts", getPosts);
app.get("/post/:postID", getOnePost);
app.post("/post/:postID/unlike", Auth, unlike);
app.delete("/post/:postID", Auth, deleteOnePost);

/**
 * ==================
 *   Cloud functions
 * ==================
 */

// Expose Express API as a single Cloud Function:
exports.api = functions.region("europe-west1").https.onRequest(app);

// Cloud firestore triggers for events => Notification
exports.NotificationLike = functions
  .region("europe-west1")
  .firestore.document(`likes/{id}`) // id => string | firebase function
  .onCreate(async snapshot => {
    try {
      const doc = await db.doc(`/Posts/${snapshot.data().postId}`).get();
      if (!doc.exists) {
        console.log({ error: "doc doesnt exist" });
      } else {
        notifSchema = {
          time: new Date().toISOString(),
          type: "like",
          postId: doc.id,
          read: false,
          sender: snapshot.data().handle,
          recipient: doc.data().handle
        };
        // create a db entry with the id of the like-document
        await db.doc(`/notifications/${snapshot.id}`).set(notifSchema);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  });

exports.deleteNotificationLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete(async snapshot => {
    try {
      await db.doc(`/notifications/${snapshot.id}`).delete();
    } catch (err) {
      console.error(err);
    }
  });

exports.NotificationComment = functions
  .region("europe-west1")
  .firestore.document(`comments/{id}`) // id => string | firebase function
  .onCreate(async snapshot => {
    try {
      const doc = await db.doc(`/Posts/${snapshot.data().postId}`).get();
      if (!doc.exists) {
        console.log({ error: "doc doesnt exist" });
      } else {
        notifSchema = {
          time: new Date().toISOString(),
          type: "like",
          postId: doc.id,
          read: false,
          sender: snapshot.data().handle,
          recipient: doc.data().handle
        };
        // create a db entry with the id of the like-document
        await db.doc(`/notifications/${snapshot.id}`).set(notifSchema);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  });
