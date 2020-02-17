const isEmptyOrWhitespace = require("./isEmptyOrWhitespace");

// isEmptyOrWhitespace()
test("Check if input is empty or contains whitespaces", () => {
  result = isEmptyOrWhitespace("");
  expect(result).toBeTruthy();
  result = isEmptyOrWhitespace(" ");
  expect(result).toBeTruthy();
  result = isEmptyOrWhitespace(" Test ");
  expect(result).toBeTruthy();
  result = isEmptyOrWhitespace("Test");
  expect(result).toBeFalsy();
});
