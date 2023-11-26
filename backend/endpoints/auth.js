const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const { loginValidator } = require("../validations/user_validations.js");

const users = require("../test_data/users.json");

const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";
const jwtExpireTime = process.env.JWT_EXPIRE_TIME || "24h";

function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;

  return rest;
}

router.post("/login", loginValidator, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);
    //TODO check user in DB
    let user = users.find((user) => user.email === data.email);
    if (user.length !== 0) {
      //TODO check password via bcrypt
      if (data.password === user.password) {
        //TODO create JWT and send it to user
        user.token = jwt.sign(
          { id: user.id, email: user.email },
          jwtSecretKey,
          { expiresIn: jwtExpireTime }
        );
        // for now token will be ID user
        user.errors = errors.array();
        return res.status(200).json(withoutProperty(user, "password"));
      }
    }
    return res.status(401).json({ errors: ["Invalid email or password"] });
  }
  res.status(400).json({ errors: errors.array() });
});

// TODO add register route

module.exports = router;
