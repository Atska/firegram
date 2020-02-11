/**
 * Checks if password or handle are invalid by being empty or whitespaces
 * @param {string} string that user enters
 * @returns {Boolean} Returns true if input is either empty or whitespaces
 */
const isEmptyOrWhitespace = input => {
    if (input.length === 0 || input.trim() === "") {
      return true;
    } else {
      return false;
    }
  };

  module.exports = isEmptyOrWhitespace;