const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const {
  loginValidator,
  registerValidator,
} = require("../validations/user_validations.js");

const auth = require("../middlewares/auth.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { getUserByEmail, createUser } = require("../db/users.js");

const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";
const jwtExpireTime = process.env.JWT_EXPIRE_TIME || "24h";

function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;

  return rest;
}

router.get("/user", auth, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/login", loginValidator, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);
    //check user in DB
    getUserByEmail(data.email).then((user) => {
      if (user) {
        // check password via bcrypt
        bcrypt.compare(data.password, user.password, function (err, result) {
          if (result) {
            //create JWT and send it to user
            user = withoutProperty(user, "password");
            user.token = jwt.sign(
              { _id: user._id, nickname: user.nickname, email: user.email },
              jwtSecretKey,
              { expiresIn: jwtExpireTime }
            );
            user.errors = errors.array();
            return res.status(200).json(user);
          }
          return res
            .status(401)
            .json({ errors: ["Invalid email or password"] });
        });
      } else {
        return res.status(401).json({ errors: ["Invalid email or password"] });
      }
    });
  } else {
    res.status(400).json({ errors: errors.array() });
  }
});

// TODO add register route

router.post("/register", registerValidator, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);
    //check user in DB
    getUserByEmail(data.email).then((user) => {
      if (user) {
        return res
          .status(409)
          .json({ errors: ["User with this email already exists"] });
      } else {
        // hash password
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
          // create user

          (data.password = hash),
            (data.sys = {
              cts: new Date(),
              mts: new Date(),
              rev: 0,
            });
          data.shoping_lists = [];
          data.shared_shopping_lists = [];

          // add user to DB
          createUser(data).then((result) => {
            // create JWT and send it to user
            data.token = jwt.sign(
              {
                _id: result.insertedId,
                nickname: data.nickname,
                email: data.email,
              },
              jwtSecretKey,
              { expiresIn: jwtExpireTime }
            );
            data.errors = errors.array();
            return res.status(200).json(withoutProperty(data, "password"));
          });
        });
      }
    });
  } else {
    res.status(400).json({ errors: errors.array() });
  }
});

module.exports = router;
