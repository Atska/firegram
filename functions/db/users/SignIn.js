const firebase = require("../../utils/firebase");

const signIn = async (request, response) => {
  // User signs in with email and password
  let user = {
    email: request.body.email,
    password: request.body.password
  };

  try {
    const userCredentials = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);

    // Fetch the JWT
    const token = await userCredentials.user.getIdToken();
    // Send the JWT
    return response.status(200).json({ token });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

module.exports = signIn;
