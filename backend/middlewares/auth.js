// auth middleware that returns user data if token is valid
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      errors: [
        "No credentials sent!",
        "please insert token in header with Bearer prefix (Bearer <token>)",
        'Or insert querry parameter "?apiKey=<API_KEY>"',
      ],
    });
  }
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
