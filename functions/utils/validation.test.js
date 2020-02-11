const {
  validateData,
  isEmptyOrWhitespace,
  validatePassword,
  validateConfirmPassword,
  validateHandle
} = require("./validation");

let result;
let expectedResult;
let data = {};
let errors = {};

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
  result = validateData(data);
  expect(result).toEqual({ errors: {}, valid: true });

  data.password = "";
  data.confirmPassword = "Test";
  data.handle = "";
  result = validateData(data);
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
