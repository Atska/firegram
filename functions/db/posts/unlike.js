const { db } = require("../../utils/admin");

const unlike = async (request, response) => {
  
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
      // check whether the like exist | limit(1) => returns array
      const getLike = await db
        .collection("likes")
        .where("handle", "==", request.user.handle)
        .where("postId", "==", request.params.postID)
        .limit(1)
        .get();
        
      if (getLike.empty) {
        return response.status(500).json({ error: "No like." });
      } else {
        db.collection("likes")
          .doc(`${getLike.docs[0].id}`)
          .delete();
        return response.status(200).json({ message: "Successfully unliked." });
      }
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = unlike;
