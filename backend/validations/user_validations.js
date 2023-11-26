const { body, header } = require("express-validator");

const loginValidator = [
  body("email", "Email is missing").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "Password is missing").not().isEmpty(),
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

module.exports = {
  loginValidator,
  registerValidator,
};
