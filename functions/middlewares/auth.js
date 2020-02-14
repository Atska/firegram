const { admin, db } = require("../utils/admin");

/**
 * Middleware to authenticate the User whether he is allowed to have access
 * https://jwt.io/introduction/
 */
const Auth = async (request, response, next) => {
  // When user logs in he sends a Jason Web Token for us to identify
  // The incoming HTTP request header
  let idToken;
  console.log("1")
  console.log(request.headers);

  // extract the JWT from Authorization: Bearer {JWT-Code}
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = request.headers.authorization.split("Bearer ")[1];
  } else {
    response.status(403).json({ error: "Unauthorized Access" });
  }
  // Check if its the right user
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    request.user = decodedToken;
    const result = await db
      .collection("Users")
      .where("userId", "==", request.user.uid)
      .limit(1)
      .get();

    request.user.handle = result.docs[0].data().handle;
    return next();
  } catch (error) {
    console.log(error);
    return response.status(403).json(error);
  }
};

module.exports = Auth;
