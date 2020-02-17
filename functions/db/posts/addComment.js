const { db } = require("../../utils/admin");

const addComment = async (request, response) => {
  commentSchema = {
    message: request.body.message,
    postId: request.params.postID,
    time: new Date().toISOString(),
    handle: request.user.handle,
    photoURL: request.user.photoURL
  };
  try {
    const getPost = await db.doc(`/Posts/${request.params.postID}`).get();
    console.log("addcomment");
    console.log(request.params);
    if (!getPost.exists) {
      return response
        .status(500)
        .json({ error: "Wanted post does not exists." });
    } else {
      await db.collection("comments").add(commentSchema);
      return response.status(200).json(commentSchema);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error sending document.." });
  }
};

module.exports = addComment;
