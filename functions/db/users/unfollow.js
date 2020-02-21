const { db } = require("../../utils/admin");

const unfollow = async (request, response) => {
  try {
    const getUser = await db.doc(`/Users/${request.params.userHandle}`).get();
    if (!getUser.exists) {
      return response.status(404).json({ message: "User does not exist." });
    } else {
      oneUser = getUser.data();
      // check whether the follow exist | limit(1) => returns array
      const getFollow = await db
        .collection("follow")
        .where("FollowerHandle", "==", request.user.handle)
        .where("FollowedHandle", "==", request.params.userHandle)
        .limit(1)
        .get();

      if (getFollow.empty) {
        return response.status(404).json({ error: "No follow." });
      } else {
        db.collection("follow")
          .doc(`${getFollow.docs[0].id}`)
          .delete();
        return response
          .status(200)
          .json({ message: "Successfully unfollowed." });
      }
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = unfollow;
