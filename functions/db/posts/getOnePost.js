const { db } = require("../../utils/admin");

const getOnePost = async (request, response) => {
  let onePost = {};
  // get one post of the required post.id and add id to the post
  // and add all the comments of this post to this onePost
  try {
    const getPost = await db.doc(`/Posts/${request.params.postID}`).get();
    if (!getPost.exists) {
      return response
        .status(500)
        .json({ error: "Wanted post does not exists." });
    } else {
      onePost = getPost.data();
      // add an unique id to the posts
      onePost.postId = getPost.id;
      onePost.comments = [];
      onePost.likes = [];
      console.log(request.params.postID)
      const getComments = await db
        .collection("comments")
        .where("postId", "==", request.params.postID)
        .orderBy("time", "desc")
        .get();
      getComments.forEach(comment => {
        onePost.comments.push(comment.data());
      });
      const getLikes = await db.collection("likes").where("postId", "==", request.params.postID).get()
      getLikes.forEach(like => {
        onePost.likes.push(like.data())
      })
      

      return response.status(200).json(onePost);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getOnePost;
