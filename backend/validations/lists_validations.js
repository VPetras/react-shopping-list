const { body, header } = require("express-validator");

const createListValidator = [
  body("name", "Name is Empty").not().isEmpty(),
  body("shared_users", "shared_users is Empty").optional().isArray(),
  body("item_list", "items is Empty").optional().isArray(),
  body("archived").optional().isBoolean(),
];

const updateListValidator = [
  body("name", "Name is Empty").optional().not().isEmpty(),
  body("shared_users", "shared_users is Empty").optional().isArray(),
  body("item_list", "items is Empty").optional().isArray(),
  body("archived").optional().isBoolean(),
];

module.exports = {
  createListValidator,
  updateListValidator,
};
