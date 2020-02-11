const { db } = require("../../utils/admin");

const addPost = (request, response) => {
  // Username and message. Time will be automatically added
  const postSchema = {
    message: request.body.message,
    userHandle: request.user.handle,
    time: new Date().toISOString()
  };
  // Using the postSchema, post data into the db
  db.collection("Posts")
    .add(postSchema)
    .then(reference =>
      response
        .status(200)
        .json({ message: `Added document with ID: ${reference.id}` })
    )
    .catch(error => {
      response.status(500).json({ error: "Error sending document.." });
      console.log("Error sending document", error);
    });
};

module.exports = addPost;
