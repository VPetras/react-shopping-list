const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const auth = require("./endpoints/auth.js");
const list = require("./endpoints/list.js");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v4/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

dotenv.config();

app.use("/", auth);
app.use("/", list);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const hostname = "0.0.0.0";
const port = process.env.PORT || 5001;

var server = app.listen(port, hostname, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("API listening at http://%s:%s", host, port);
});
