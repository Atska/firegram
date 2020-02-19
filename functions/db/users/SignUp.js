const firebase = require("../../utils/firebase");
const firebaseConfig = require("../../utils/firebaseConfig");
const { db } = require("../../utils/admin");
const {
  validateSignUpData
} = require("../../utils/validations/validateSignUpData");

const SignUp = async (request, response) => {
  // schema for user registration
  const userSchema = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle
  };
  // Give new user a default image
  const photoURL = "default.png";
  // Validation of inputs, no empty, no whitespaces, password must be match and confirmed
  // Email validation is made by firebase
  const { errors, valid } = validateSignUpData(userSchema);
  if (!valid) return response.status(400).json(errors);

  try {
    const documentPath = await db.doc(`/Users/${userSchema.handle}`).get();
    if (documentPath.exists) {
      return response.status(403).json({ handle: "Handle already taken." });
    } else {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(userSchema.email, userSchema.password);

      const token = await createdUser.user.getIdToken();
      const userInfo = {
        userId: createdUser.user.uid,
        email: userSchema.email,
        handle: userSchema.handle,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${photoURL}?alt=media`,
        time: new Date().toISOString()
      };
      // creates the database entry of the user
      await db.doc(`/Users/${userSchema.handle}`).set(userInfo);
      return response.status(201).json({ token });
    }
  } catch (error) {
    console.log(error.code);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = SignUp;
