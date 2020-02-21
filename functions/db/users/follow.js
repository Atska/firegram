const { db } = require("../../utils/admin");
const follow = async (request, response) => {
  followSchema = {
    FollowerHandle: request.user.handle,
    FollowedHandle: request.params.userHandle, // needs refactor
    time: new Date().toISOString()
  };

  try {
    const getUser = await db.doc(`/Users/${request.params.userHandle}`).get();
    if (!getUser.exists) {
      return response.status(404).json({ message: "User does not exist." });
    } else {
      await db.collection("follow").add(followSchema);
      return response.status(200).json(followSchema);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = follow;
