const { body, header } = require("express-validator");

const loginValidator = [
  body("email", "Email is Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 8 characters").isLength({
    min: 8,
  }),
];

const registerValidator = [
  body("name", "Name is Empty").not().isEmpty(),
  body("surname", "Surname is Empty").not().isEmpty(),
  body("nickname", "Nickname is Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "Password is Empty").not().isEmpty(),
  body("password", "The minimum password length is 8 characters").isLength({
    min: 8,
  }),
];

const tokenValidator = [
  header("authorization", "No credentials sent!").not().isEmpty(),
];

const createListValidator = [
  header("authorization", "No credentials sent!").not().isEmpty(),
  body("name", "Name is Empty").not().isEmpty(),
  body("shared_users", "shared_users is Empty").optional().isArray(),
  body("items", "items is Empty").optional().isArray(),
];

const updateListValidator = [
  header("authorization", "No credentials sent!").not().isEmpty(),
  body("name", "Name is Empty").optional().not().isEmpty(),
  body("shared_users", "shared_users is Empty").optional().isArray(),
  body("items", "items is Empty").optional().isArray(),
  body("archived").optional().isBoolean(),
];

module.exports = {
  loginValidator,
  registerValidator,
  tokenValidator,
  createListValidator,
  updateListValidator,
};
