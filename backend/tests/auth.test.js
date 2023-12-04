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
const mongo_users_collection = mongo_db.collection(
  process.env.MONGO_USERS_COLLECTION
);

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongo_client.connect();
  await mongo_users_collection.deleteMany({});
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongo_client.close();
});

describe("POST /register", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({
        surname: "Petrásek",
        name: "Vojtěch",
        nickname: "Sonic",
        email: "vojtechpetrasek@gmail.com",
        password: "testtest",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.nickname).toBe("Sonic");
        expect(res.body.email).toBe("vojtechpetrasek@gmail.com");
        expect(res.body).toHaveProperty("token");
      });
  });
});

describe("POST /login", () => {
  test("login user", async () => {
    const password = "testtest";
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await mongo_users_collection.insertOne({
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "Sonic",
      email: "vojtechpetrasek@gmail.com",
      password: hashedPassword,
    });

    return request(app)
      .post("/login")
      .send({
        email: "vojtechpetrasek@gmail.com",
        password: "testtest",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.nickname).toBe("Sonic");
        expect(res.body.email).toBe("vojtechpetrasek@gmail.com");
        expect(res.body).toHaveProperty("token");
      });
  });
});
