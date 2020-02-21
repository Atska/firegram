const { db } = require("../../utils/admin");

const getUserProfile = async (request, response) => {
  let userData = {};
  try {
    const wantedUser = await db.doc(`/Users/${request.user.handle}`).get();
    if (!wantedUser.exists) {
      return response.status(404).json({ error: "User does not exists." });
    } else {
      userData["credentials"] = wantedUser.data();
      const data = await db
        .collection("Upvoted")
        .where("handle", "==", request.user.handle)
        .get();
      data.forEach(doc => {
        userData.upvoted.push(doc.data());
      });
      return response.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getUserProfile;
