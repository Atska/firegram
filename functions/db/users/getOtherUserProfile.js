const { db } = require("../../utils/admin");
const CollectionQueries = require("./../../utils/queries");

const getOtherUserProfile = async (request, response) => {
  const CQ = new CollectionQueries();
  let oneUser = {};
  // Additional displayed infomation
  oneUser.posts = [];
  oneUser.follows = [];
  oneUser.followedBy = [];
  try {
    const getUser = await db.doc(`/Users/${request.params.handle}`).get();
    if (!getUser.exists) {
      return response.status(404).json({ message: "User does not exist." });
    } else {
      oneUser.credentials = getUser.data();
      // add posts of this user

      const postData = await CQ.getOrderedQuery(
        "Posts",
        "handle",
        "==",
        request.params.handle,
        "time",
        "desc"
      );

      postData.forEach(post => {
        // add the id of the post into the json
        let onePost = post.data();
        onePost.postId = post.id;
        oneUser.posts.push(onePost);
      });

      // Who auth. User follows
      const followData = await CQ.getQuery(
        "follow",
        "FollowerHandle",
        "==",
        request.user.handle
      );

      followData.forEach(doc => {
        let oneDoc = doc.data();
        oneDoc.followId = doc.id;
        oneUser.follows.push(oneDoc);
      });
      // Who follows the auth. User
      const followedData = await CQ.getQuery(
        "follow",
        "FollowedHandle",
        "==",
        request.user.handle
      );

      followedData.forEach(doc => {
        let oneDoc = doc.data();
        oneDoc.followId = doc.id;
        oneUser.followedBy.push(oneDoc);
      });

      return response.status(200).json(oneUser);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = getOtherUserProfile;
