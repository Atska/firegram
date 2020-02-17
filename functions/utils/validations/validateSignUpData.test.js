const {
  validateSignUpData,
  validatePassword,
  validateConfirmPassword,
  validateHandle
} = require("./validateSignUpData");

let result;
let expectedResult;
let data = {};

// validatePassword()
test("Validate password", () => {
  data.password = "";
  result = validatePassword(data);
  expectedResult = {
    valid: false,
    error: "Password must not be empty or contain whitespaces."
  };
  expect(result).toEqual(expectedResult);

  data.password = "PaSsWoRd123";
  result = validatePassword(data);
  expect(result).toEqual({ valid: true });
  expect(result.error).toBeUndefined();

  data.password = "pass word ";
  result = validatePassword(data);
  expect(result).toEqual(expectedResult);
});

// validateConfirmPassword()
test("Validate confirmPassword", () => {
  data.password = "Firebase123";
  data.confirmPassword = "Firebase1234";
  result = validateConfirmPassword(data);
  expectedResult = {
    valid: false,
    error: "Passwords do not match."
  };
  expect(result).toEqual(expectedResult);

  data.password = "Firebase123";
  data.confirmPassword = "Firebase123";
  result = validateConfirmPassword(data);
  expect(result).toEqual({ valid: true });
  expect(result.error).toBeUndefined();
});

// validateHandle()
test("Validate handle", () => {
  data.handle = "";
  result = validateHandle(data);
  expectedResult = {
    valid: false,
    error: "Handle cannot be empty"
  };
  expect(result).toEqual(expectedResult);

  data.handle = "Firebase";
  result = validateHandle(data);
  expect(result).toEqual({ valid: true });
  expect(result.error).toBeUndefined();
});

// validateData()
test("Validate all data", () => {
  result = validateSignUpData(data);
  expect(result).toEqual({ errors: {}, valid: true });

  data.password = "";
  data.confirmPassword = "Test";
  data.handle = "";
  result = validateSignUpData(data);
  expectedResult = {
    errors: {
      handle: "Handle cannot be empty",
      password: "Password must not be empty or contain whitespaces.",
      confirmPassword: "Passwords do not match."
    },
    valid: false
  };
  expect(result).toEqual(expectedResult);
});
