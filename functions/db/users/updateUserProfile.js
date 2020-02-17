const { db } = require("../../utils/admin");
const {
  validateUserProfileData
} = require("../../utils/validations/validateUserProfileData");

const allowedCharacters = 150;

const updateUserProfile = async (request, response) => {
  // request.body.bio and website
  let userProfile = validateUserProfileData(request.body);
  console.log(userProfile)
  if (userProfile.bio.length >= allowedCharacters) {
    return response.status(500).json({error: "Bio cannot have more than 150 characters."})
  }
  
  try {
    await db.doc(`/Users/${request.user.handle}`).update(userProfile);

    return response
      .status(200)
      .json({ message: "Profile was successfully updated." });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.code });
  }
};

module.exports = updateUserProfile