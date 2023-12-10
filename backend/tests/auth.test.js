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

describe("POST /register without body", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({})
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /register without surname", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({
        name: "Vojtěch",
        nickname: "Sonic",
        email: "vojtechpetrasek@gmail.com",
        password: "testtest",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /register without name", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({
        surname: "Petrásek",
        nickname: "Sonic",
        email: "vojtechpetrasek@gmail.com",
        password: "testtest",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /register without nickname", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({
        surname: "Petrásek",
        name: "Vojtěch",
        email: "vojtechpetrasek@gmail.com",
        password: "testtest",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /register without email", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({
        surname: "Petrásek",
        name: "Vojtěch",
        nickname: "Sonic",
        password: "testtest",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /register without password", () => {
  test("register new user", async () => {
    return request(app)
      .post("/register")
      .send({
        surname: "Petrásek",
        name: "Vojtěch",
        nickname: "Sonic",
        email: "vojtechpetrasek@gmail.com",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /register with existing email", () => {
  test("register new user", async () => {
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
      .post("/register")
      .send({
        surname: "Petrásek",
        name: "Vojtěch",
        nickname: "Sonic",
        email: "vojtechpetrasek@gmail.com",
        password: "random password",
      })
      .expect(409)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("errors");
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

describe("POST /login without body", () => {
  test("login user", async () => {
    return request(app)
      .post("/login")
      .send({})
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /login without email", () => {
  test("login user", async () => {
    return request(app)
      .post("/login")
      .send({
        password: "testtest",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /login without password", () => {
  test("login user", async () => {
    return request(app)
      .post("/login")
      .send({
        email: "vojtechpetrasek@gmail.com",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /login with non-existing email", () => {
  test("login user", async () => {
    return request(app)
      .post("/login")
      .send({
        email: "vojtech.petrasek@gmail.com",
        password: "testtest",
      })
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("POST /login with wrong password", () => {
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
        password: "random password",
      })
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("GET /user", () => {
  test("get user", async () => {
    const password = "testtest";
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await mongo_users_collection.insertOne({
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "Sonic",
      email: "vojtechpetrasek@gmail.com",
      password: hashedPassword,
    });

    const user = await mongo_users_collection.findOne({
      email: "vojtechpetrasek@gmail.com",
    });

    const token = jwt.sign(
      { _id: user._id, nickname: user.nickname, email: user.email },
      jwtSecretKey,
      { expiresIn: jwtExpireTime }
    );

    return request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.nickname).toBe("Sonic");
        expect(res.body.email).toBe("vojtechpetrasek@gmail.com");
      });
  });
});

describe("GET /user without token", () => {
  test("get user", async () => {
    return request(app)
      .get("/user")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("GET /user with invalid token", () => {
  test("get user", async () => {
    const token = "invalid token";

    return request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });
});
