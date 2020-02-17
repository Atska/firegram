const { db } = require("../../utils/admin");

const getOnePost = async (request, response) => {
  let onePost = {};
  // get one post of the required post.id and add id to the post
  // and add all the comments of this post to this onePost
  try {
    const getPost = await db.doc(`/Posts/${request.params.postID}`).get();
    console.log("hi");
    console.log(request.params);
    if (!getPost.exists) {
      return response
        .status(500)
        .json({ error: "Wanted post does not exists." });
    } else {
      onePost = getPost.data();
      // add an unique id to the posts
      console.log(9);
      onePost.postId = getPost.id;
      onePost.comments = [];
      console.log(onePost);
      const getComments = await db
        .collection("comments")
        .where("postId", "==", request.params.postID)
        .orderBy("time", "desc")
        .get();

      console.log(10);
      console.log(getComments);
      getComments.forEach(comment => {
        onePost.comments.push(comment.data());
      });
      return response.status(200).json(onePost);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getOnePost;
