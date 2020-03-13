const { db } = require("../../utils/admin");

const getUserProfile = async (request, response) => {
  let userData = {};

  userData.likes = [];
  userData.notifications = [];
  userData.follows = [];
  userData.followedBy = [];
  try {
    const wantedUser = await db.doc(`/Users/${request.user.handle}`).get();
    if (!wantedUser.exists) {
      return response.status(404).json({ error: "User does not exists." });
    } else {
      // get all info from the user into credetials
      userData.credentials = wantedUser.data();
      // Send all likes from the user into the json
      const likeData = await db
        .collection("likes")
        .where("handle", "==", request.user.handle)
        .get();

      likeData.forEach(doc => {
        // add the id of the like into the json
        let oneDoc = doc.data();
        oneDoc.likeId = doc.id;
        userData.likes.push(oneDoc);
      });
      // Send all notification to json
      const notifData = await db
        .collection("notifications")
        .where("recipient", "==", request.user.handle)
        .orderBy("time", "desc")
        .get();

      notifData.forEach(doc => {
        // add the id of the notification into the json
        let oneDoc = doc.data();
        oneDoc.notificationId = doc.id;
        userData.notifications.push(oneDoc);
      });
      // Who auth. User follows
      const followData = await db
        .collection("follow")
        .where("FollowerHandle", "==", request.user.handle)
        .get();

      followData.forEach(doc => {
        let oneDoc = doc.data();
        oneDoc.followId = doc.id;
        userData.follows.push(oneDoc);
      });
      // Who follows the auth. User
      const followedData = await db
        .collection("follow")
        .where("FollowedHandle", "==", request.user.handle)
        .get();

      followedData.forEach(doc => {
        let oneDoc = doc.data();
        oneDoc.followId = doc.id;
        userData.followedBy.push(oneDoc);
      });
      return response.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error });
  }
};

module.exports = getUserProfile;
