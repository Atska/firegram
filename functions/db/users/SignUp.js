const firebase = require("../../utils/firebase");
const firebaseConfig = require("../../utils/firebaseConfig");
const { db } = require("../../utils/admin");
const {
  validateSignUpData
} = require("../../utils/validations/validateSignUpData");

const SignUp = (request, response) => {
  // schema for user registration
  const userSchema = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle
  };

  // Validation of inputs, no empty, no whitespaces, password must be match and confirmed
  // Email validation is made by firebase
  const { errors, valid } = validateSignUpData(userSchema);
  if (!valid) return response.status(400).json(errors);

  // Variables used later
  let userId;
  let token;
  // Give new user a default image
  const photoURL = "default.png";

  // Traverse the db-document
  db.doc(`/Users/${userSchema.handle}`)
    .get()
    // Check if the requested handle is taken
    // If not firebase creates the user
    .then(documentPath => {
      if (documentPath.exists) {
        return response.status(403).json({ handle: "Handle already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            userSchema.email,
            userSchema.password
          );
      }
    })
    // Return a Json Web Token to identify the user to firebase services
    // Return the current token if not expired
    .then(createdUser => {
      userId = createdUser.user.uid;
      return createdUser.user.getIdToken();
    })
    // Create a document with the user infomation and the handle as
    // unique identifier
    .then(JWT => {
      token = JWT;
      const userInfo = {
        userId,
        email: userSchema.email,
        handle: userSchema.handle,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${photoURL}?alt=media`,
        time: new Date().toISOString()
      };
      return db.doc(`/Users/${userSchema.handle}`).set(userInfo);
    })
    // Resolves the promise and send the token
    .then(() => response.status(201).json({ token }))
    .catch(error => {
      // cloud function has special error codes, checks automatically if email is taken
      console.log(error.code);
      console.log(error.message);
      return response.status(500).json({ error: error.code });
    });
};

module.exports = SignUp;
