const { db } = require("../../utils/admin");

const getPosts = async (request, response) => {
  // "Posts" is the name of the database (collection in firebase)
  // Get all the data from the noSql db and store them in an array. Return json object
  let posts = [];
  try {
    // Query to get User profile picture
    const postResults = await db
      .collection("Posts")
      .orderBy("time", "desc")
      .get();
    const getComments = await db.collection("comments").get();
    const getLikes = await db.collection("likes").get();
    // result.data() is a json object
    postResults.forEach(result => {
      let postSchema = {
        postId: result.id,
        message: result.data().message,
        handle: result.data().handle,
        time: result.data().time,
        photoURL: result.data().photoURL
      };

      postSchema.likes = [];
      getLikes.forEach(like => {
        if (like.data().postId === result.id) {
          postSchema.likes.push(like.data());
        }
      });

      postSchema.comments = [];
      getComments.forEach(comment => {
        if (comment.data().postId === result.id) {
          postSchema.comments.push(comment.data());
        }
      });
      posts.push(postSchema);
    });
    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getPosts;
