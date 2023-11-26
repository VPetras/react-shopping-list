// auth middleware that returns user data if token is valid
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ errors: ["Invalid token"] });
  }
};

module.exports = auth;
