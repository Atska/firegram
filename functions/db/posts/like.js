const { db } = require("../../utils/admin");

const like = async (request, response) => {
  likeSchema = {
    handle: request.user.handle,
    postId: request.params.postID,
    time: new Date().toISOString()
  };

  try {
    // check whether the post exist
    const getPost = await db.doc(`/Posts/${request.params.postID}`).get();
    if (!getPost.exists) {
      return response
        .status(500)
        .json({ error: "Wanted post does not exists." });
    } else {
      onePost = getPost.data();
      // add an unique id to the posts
      onePost.postId = getPost.id;
      console.log(onePost)
      // check whether the like exist | limit(1) => returns array
      const getLike = await db
        .collection("likes")
        .where("handle", "==", request.user.handle)
        .where("postId", "==", request.params.postID)
        .limit(1)
        .get();
        console.log(getLike)
        
      if (getLike.empty) {
        db.collection("likes").add(likeSchema);
        return response.status(200).json({ message: "Successfully liked." });
      } else {
        return response.status(500).json({ error: "Already liked." });
      }
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};
module.exports = like;
