const { db } = require("../../utils/admin");

const addPost = async (request, response) => {
  // Username and message. Time will be automatically added
  const postSchema = {
    message: request.body.message,
    handle: request.user.handle,
    time: new Date().toISOString()
  };
  // Using the postSchema, post data into the db
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
