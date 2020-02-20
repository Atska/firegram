const { db } = require("../../utils/admin");

const deleteOnePost = async (request, response) => {
  try {
    const doc = db.doc(`/Posts/${request.params.postID}`);
    const getPost = await doc.get();
    console.log(getPost.data().handle);
    console.log(getPost.data());
    console.log(request.params.postID);

    if (!getPost.exists) {
      return response
        .status(404)
        .json({ error: "Wanted post does not exists." });
    } else if (getPost.data().handle !== request.user.handle) {
      return response.status(403).json({ error: "Unauthorized user" });
    } else {
      await doc.delete();
      return response
        .status(200)
        .json({ message: "Post successfully deleted." });
    }
  } catch (error) {
    console.log(error);
    return response.status(404).json({ error: error.code });
  }
};

module.exports = deleteOnePost;
