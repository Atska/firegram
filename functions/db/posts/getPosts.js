const { db } = require("../../utils/admin");

const getPosts = (request, response) => {
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
};

module.exports = getPosts;
