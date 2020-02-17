const { db } = require("../../utils/admin");

const getUserProfile = async (request, response) => {
  console.log(5);
  console.log(request.user);

  let userData = {};
  try {
    const wantedUser = await db.doc(`/Users/${request.user.handle}`).get();
    if (!wantedUser.exists) {
      return response.status(404).json({ error: "User does not exists." });
    } else {
      userData["credentials"] = wantedUser.data();
      userData.upvoted = [];
      console.log(6);
      console.log(userData);
      const data = await db
        .collection("Upvoted")
        .where("handle", "==", request.user.handle)
        .get();
      console.log(7);
      console.log(data);
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
