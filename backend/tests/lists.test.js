const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const request = require("supertest");
const app = require("../main");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpireTime = process.env.JWT_EXPIRE_TIME;

const mongo_client = new MongoClient(process.env.MONGO_URI);
const mongo_db = mongo_client.db(process.env.MONGO_DB);
const mongo_lists_collection = mongo_db.collection(
  process.env.MONGO_LISTS_COLLECTION
);
const mongo_users_collection = mongo_db.collection(
  process.env.MONGO_USERS_COLLECTION
);

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongo_client.connect();
  await mongo_lists_collection.deleteMany({});
  await mongo_users_collection.deleteMany({});
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongo_client.close();
});

describe("GET /", () => {
  test("get hello world", async () => {
    return request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello World!");
      });
  });
});
