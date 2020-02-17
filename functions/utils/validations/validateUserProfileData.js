const isEmptyOrWhiteSpace = require("./isEmptyOrWhitespace");

const userProfile = {};

const validateBio = data => {
  if (!isEmptyOrWhiteSpace(data.bio.trim())) {
    userProfile.bio = data.bio.trim();
  }
};

const validateWebsite = data => {
  if (!isEmptyOrWhiteSpace(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userProfile.website = `http://${data.website.trim()}`;
    } else {
      userProfile.website = data.website.trim();
    }
  }
};
// data = request.body
const validateUserProfileData = data => {
  validateBio(data);
  validateWebsite(data);
  return userProfile;
};

module.exports = { validateBio, validateUserProfileData, validateWebsite };
