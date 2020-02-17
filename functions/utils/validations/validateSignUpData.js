const isEmptyOrWhitespace = require("./isEmptyOrWhitespace");

// Valid and invalid consts for readability
const VALID = true;
const INVALID = false;

const setValidResponse = (valid, error) => {
  if (valid) return { valid };
  return { valid, error };
};

const validatePassword = data => {
  if (isEmptyOrWhitespace(data.password)) {
    return setValidResponse(
      INVALID,
      "Password must not be empty or contain whitespaces."
    );
  }
  return setValidResponse(VALID);
};

const validateConfirmPassword = data => {
  if (data.password !== data.confirmPassword) {
    return setValidResponse(INVALID, "Passwords do not match.");
  }
  return setValidResponse(VALID);
};

const validateHandle = data => {
  if (isEmptyOrWhitespace(data.handle)) {
    return setValidResponse(INVALID, "Handle cannot be empty");
  }
  return setValidResponse(VALID);
};

const validateSignUpData = data => {
  let errors = {};
  if (validatePassword(data).error) {
    errors.password = validatePassword(data).error;
  }
  if (validateConfirmPassword(data).error) {
    errors.confirmPassword = validateConfirmPassword(data).error;
  }
  if (validateHandle(data).error) {
    errors.handle = validateHandle(data).error;
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

module.exports = {
  validateSignUpData,
  validatePassword,
  validateConfirmPassword,
  validateHandle
};
