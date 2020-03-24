const { db } = require("../../utils/admin");
const isEmptyOrWhitespace = require("../../utils/validations/isEmptyOrWhitespace");

const addPost = async (request, response) => {
  if (isEmptyOrWhitespace(request.body.message)) {
    return response.status(400).json({body: "Message cannot be empty."})
  }
  const postSchema = {
    message: request.body.message,
    handle: request.user.handle,
    time: new Date().toISOString(),
    photoURL: request.user.photoURL
  };

  try {
    const reference = await db.collection("Posts").add(postSchema);
    return response
      .status(200)
      .json({ message: `Added document with ID: ${reference.id}` });
  } catch (error) {
    return response.status(500).json({ error: "Error sending document.." });
  }
};

module.exports = addPost;
