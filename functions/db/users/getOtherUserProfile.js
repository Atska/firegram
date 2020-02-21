const { db } = require("../../utils/admin");

const getOtherUserProfile = async (request, response) => {
  try {
    const getUser = await db.doc(`/Users/${request.params.userHandle}`).get();
    if (!getUser.exists) {
      return response.status(404).json({ message: "User does not exist." });
    } else {
      oneUser = getUser.data();
      return response.status(200).json(oneUser);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getOtherUserProfile;
