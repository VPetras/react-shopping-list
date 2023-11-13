const express = require("express");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const { loginValidator } = require("./validation.js");

const users = require("./test_data/users.json");

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpireTime = process.env.JWT_EXPIRE_TIME || "24h";

function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;

  return rest;
}

router.post("/login", loginValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);
    //TODO check user in DB
    let user = users.find((user) => user.email === data.email);
    console.log(data);
    console.log(user);
    if (user) {
      //TODO check password via bcrypt
      if (data.password === user.password) {
        //TODO create JWT and send it to user
        // for now token will be ID user
        return res.status(200).json(withoutProperty(user, "password"));
      }
    }
    return res.status(401).json({ errors: ["Invalid email or password"] });
  }
  res.status(422).json({ errors: errors.array() });
});

// TODO add register route

module.exports = router;
