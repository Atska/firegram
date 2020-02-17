const { validateUserProfileData } = require("./validateUserProfileData");

let data;
let expectedResult;
let result;

test("validate the user profile", () => {
  data = {
    bio: "",
    website: ""
  };
  result = validateUserProfileData(data);
  expectedResult = {};
  expect(result).toEqual(expectedResult);

  data = {
    bio: " test ",
    website: " test.com "
  };
  result = validateUserProfileData(data);
  expectedResult = {
    bio: "test",
    website: "http://test.com"
  };
  expect(result).toEqual(expectedResult);

  data = {
    bio: " test ",
    website: "https://test.com "
  };
  result = validateUserProfileData(data);
  expectedResult = {
    bio: "test",
    website: "https://test.com"
  };
  expect(result).toEqual(expectedResult);

});
