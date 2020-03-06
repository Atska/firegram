const { db } = require("../../utils/admin");

const getPosts = async (request, response) => {
  // "Posts" is the name of the database (collection in firebase)
  // Get all the data from the noSql db and store them in an array. Return json object
  const posts = [];
  try {
    const postResults = await db
      .collection("Posts")
      .orderBy("time", "desc")
      .get();
    // result.data() is a json object
    postResults.forEach(result => {
      posts.push({
        postId: result.id,
        message: result.data().message,
        handle: result.data().handle,
        time: result.data().time,
        photoURL: result.data().photoURL,
        likes: result.data().likes,
        comments: result.data().comments
      });
    });

    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getPosts;
