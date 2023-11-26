const { body, header } = require("express-validator");

const tokenValidator = [
  header("authorization", "No credentials sent!").not().isEmpty(),
];

const createListValidator = [
  header("authorization", "No credentials sent!").not().isEmpty(),
  body("name", "Name is Empty").not().isEmpty(),
  body("shared_users", "shared_users is Empty").optional().isArray(),
  body("item_list", "items is Empty").optional().isArray(),
];

const updateListValidator = [
  header("authorization", "No credentials sent!").not().isEmpty(),
  body("name", "Name is Empty").optional().not().isEmpty(),
  body("shared_users", "shared_users is Empty").optional().isArray(),
  body("item_list", "items is Empty").optional().isArray(),
  body("archived").optional().isBoolean(),
];

module.exports = {
  tokenValidator,
  createListValidator,
  updateListValidator,
};
