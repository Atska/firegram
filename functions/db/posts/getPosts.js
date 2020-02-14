const { db } = require("../../utils/admin");

const getPosts = async (request, response) => {
  // "Posts" is the name of the database (collection in firebase)
  // Get all the data from the noSql db and store them in an array. Return json object
  try {
    const results = await db
      .collection("Posts")
      .orderBy("time", "desc")
      .get();

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
  } catch (error) {
    return response.status(500).json({ error: error });
  }
};

module.exports = getPosts;
