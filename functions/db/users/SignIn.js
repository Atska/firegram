const firebase = require("../../utils/firebase");

const SignIn = (request, respond) => {
  // User signs in with email and password
  let user = {
    email: request.body.email,
    password: request.body.password
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    // Fetch the JWT
    .then(userCredentials => userCredentials.user.getIdToken())
    // Send the JWT
    .then(token => respond.status(200).json({ token }))
    .catch(error => response.status(500).json({ error: error.code }));
};

module.exports = SignIn;
