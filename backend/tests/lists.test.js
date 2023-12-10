const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const request = require("supertest");
const app = require("../main");

require("dotenv").config();

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

describe("POST /list/create", () => {
  test("It should create a new list", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    let uset_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        user_token = res.body.token;
      });

    const list = {
      name: "Test list",
      archived: false,
      item_list: [],
    };

    await request(app)
      .post("/list/create")
      .send(list)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("archived");
        expect(res.body).toHaveProperty("item_list");
        expect(res.body).toHaveProperty("sys");
        expect(res.body).toHaveProperty("shared_users");
        expect(res.body.name).toBe(list.name);
        expect(res.body.archived).toBe(list.archived);
        expect(res.body.item_list).toEqual(list.item_list);
      });
  });
  test("It should get error 401", async () => {
    const list = {
      name: "Test list",
      archived: false,
      item_list: [],
    };

    await request(app)
      .post("/list/create")
      .send(list)
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("GET /lists", () => {
  test("it should get error 401", async () => {
    await request(app)
      .get("/lists")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });
  test("It should get all lists empty", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gamil.com",
      password: "testtest",
    };

    let user_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        user_token = res.body.token;
      });

    await request(app)
      .get("/lists")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("active_lists");
        expect(res.body).toHaveProperty("archived_lists");
        expect(res.body).toHaveProperty("shared_lists");
        expect(res.body.active_lists).toStrictEqual([]);
        expect(res.body.archived_lists).toStrictEqual([]);
        expect(res.body.shared_lists).toStrictEqual([]);
      });
  });
  test("It should get all lists active shared and archived", async () => {
    const user1 = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "Sonic",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    const user2 = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "VPetras",
      email: "vojtech.petrasek@gmail.com",
      password: "testtest",
    };

    let ret_user1 = [];

    await request(app)
      .post("/register")
      .send(user1)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        ret_user1 = res.body;
      });

    let ret_user2 = [];

    await request(app)
      .post("/register")
      .send(user2)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        ret_user2 = res.body;
      });

    const list1 = {
      name: "Test list",
      archived: false,
      item_list: [],
      shared_users: [],
    };

    const list2 = {
      name: "Test list 2",
      archived: true,
      item_list: [],
      shared_users: [],
    };

    const list3 = {
      name: "Test list 3",
      archived: false,
      item_list: [],
      shared_users: [{ id: ret_user1._id, nickname: ret_user1.nickname }],
    };

    await request(app)
      .post("/list/create")
      .send(list1)
      .set("Authorization", `Bearer ${ret_user1.token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("archived");
        expect(res.body).toHaveProperty("item_list");
        expect(res.body).toHaveProperty("sys");
        expect(res.body).toHaveProperty("shared_users");
        expect(res.body.name).toBe(list1.name);
        expect(res.body.archived).toBe(list1.archived);
        expect(res.body.item_list).toEqual(list1.item_list);
      });

    await request(app)
      .post("/list/create")
      .send(list2)
      .set("Authorization", `Bearer ${ret_user1.token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("archived");
        expect(res.body).toHaveProperty("item_list");
        expect(res.body).toHaveProperty("sys");
        expect(res.body).toHaveProperty("shared_users");
        expect(res.body.name).toBe(list2.name);
        expect(res.body.archived).toBe(list2.archived);
        expect(res.body.item_list).toEqual(list2.item_list);
      });

    await request(app)
      .post("/list/create")
      .send(list3)
      .set("Authorization", `Bearer ${ret_user2.token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("archived");
        expect(res.body).toHaveProperty("item_list");
        expect(res.body).toHaveProperty("sys");
        expect(res.body).toHaveProperty("shared_users");
        expect(res.body.name).toBe(list3.name);
        expect(res.body.archived).toBe(list3.archived);
        expect(res.body.item_list).toEqual(list3.item_list);
      });

    await request(app)
      .get("/lists")
      .set("Authorization", `Bearer ${ret_user1.token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("active_lists");
        expect(res.body).toHaveProperty("archived_lists");
        expect(res.body).toHaveProperty("shared_lists");
        expect(res.body.active_lists).toHaveLength(1);
        expect(res.body.archived_lists).toHaveLength(1);
        expect(res.body.shared_lists).toHaveLength(1);
        expect(res.body.active_lists[0]).toHaveProperty("name");
        expect(res.body.active_lists[0]).toHaveProperty("archived");
        expect(res.body.active_lists[0]).toHaveProperty("item_list");
        expect(res.body.active_lists[0]).toHaveProperty("sys");
        expect(res.body.active_lists[0]).toHaveProperty("shared_users");
        expect(res.body.archived_lists[0]).toHaveProperty("name");
        expect(res.body.archived_lists[0]).toHaveProperty("archived");
        expect(res.body.archived_lists[0]).toHaveProperty("item_list");
        expect(res.body.archived_lists[0]).toHaveProperty("sys");
        expect(res.body.archived_lists[0]).toHaveProperty("shared_users");
        expect(res.body.shared_lists[0]).toHaveProperty("name");
        expect(res.body.shared_lists[0]).toHaveProperty("archived");
        expect(res.body.shared_lists[0]).toHaveProperty("item_list");
        expect(res.body.shared_lists[0]).toHaveProperty("sys");
        expect(res.body.shared_lists[0]).toHaveProperty("shared_users");
      });
  });
});

describe("GET /list/:id", () => {
  test("It should get a list", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    let user_token = "";
    let user_id = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        user_token = res.body.token;
        user_id = res.body._id;
      });

    const list = {
      name: "Test list",
      archived: false,
      item_list: [],
      shared_users: [],
    };

    let list_id = "";

    await request(app)
      .post("/list/create")
      .send(list)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("archived");
        expect(res.body).toHaveProperty("item_list");
        expect(res.body).toHaveProperty("sys");
        expect(res.body).toHaveProperty("shared_users");
        expect(res.body.name).toBe(list.name);
        expect(res.body.archived).toBe(list.archived);
        expect(res.body.item_list).toEqual(list.item_list);
        list_id = res.body._id;
      });

    await request(app)
      .get(`/list/${list_id}`)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("archived");
        expect(res.body).toHaveProperty("item_list");
        expect(res.body).toHaveProperty("sys");
        expect(res.body).toHaveProperty("shared_users");
        expect(res.body.name).toBe(list.name);
        expect(res.body.archived).toBe(list.archived);
        expect(res.body.item_list).toEqual(list.item_list);
        expect(res.body.owner_id).toBe(user_id);
      });
  });
});

describe("GET /list/:id", () => {
  test("it should get error 401", async () => {
    await request(app)
      .get("/list/123456789")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });

  test("it should get error 404", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    let user_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        user_token = res.body.token;
      });

    await request(app)
      .get("/list/123456789")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(404)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("errors");
      });
  });

  test("it should get error 403", async () => {
    const user1 = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "Sonic",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    const user2 = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "VPetras",
      email: "vojtech.petrasek@gmail.com",
      password: "testtest",
    };

    let ret_user1 = [];

    await request(app)
      .post("/register")
      .send(user1)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        ret_user1 = res.body;
      });

    let ret_user2 = [];

    await request(app)
      .post("/register")
      .send(user2)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        ret_user2 = res.body;
      });

    const list = {
      name: "Test list",
      archived: false,
      item_list: [],
      shared_users: [],
    };

    let list_id = "";

    await request(app)
      .post("/list/create")
      .send(list)
      .set("Authorization", `Bearer ${ret_user1.token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        list_id = res.body._id;
      });

    await request(app)
      .get(`/list/${list_id}`)
      .set("Authorization", `Bearer ${ret_user2.token}`)
      .expect(403)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("PUT /list/:id", () => {
  test("It should update a list", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtech.petrasek@gmail.com",
      password: "testtest",
    };

    let user_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        user_token = res.body.token;
      });

    const list = {
      name: "Test list",
      archived: false,
      item_list: [],
      shared_users: [],
    };

    let list_id = "";

    await request(app)
      .post("/list/create")
      .send(list)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        list_id = res.body._id;
      });

    const list_update = {
      name: "Test list updated",
      archived: true,
      item_list: [{ name: "Test item", checked: false }],
      shared_users: [],
    };

    await request(app)
      .put(`/list/${list_id}`)
      .send(list_update)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.name).toBe(list_update.name);
        expect(res.body.archived).toBe(list_update.archived);
        expect(res.body.item_list).toEqual(list_update.item_list);
        expect(res.body.shared_users).toEqual(list_update.shared_users);
      });
  });
  test("it should get error 401", async () => {
    await request(app)
      .put("/list/123456789")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });

  test("it should get error 404", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    let user_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        user_token = res.body.token;
      });

    const list_update = {
      name: "Test list updated",
      archived: true,
      item_list: [{ name: "Test item", checked: false }],
      shared_users: [],
    };

    await request(app)
      .put("/list/123456789")
      .send(list_update)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(404)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("errors");
      });
  });
});

describe("DELETE /list/:id", () => {
  test("It should delete a list", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    let user_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        user_token = res.body.token;
      });

    const list = {
      name: "Test list",
      archived: false,
      item_list: [],
      shared_users: [],
    };

    let list_id = "";

    await request(app)
      .post("/list/create")
      .send(list)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        list_id = res.body._id;
      });

    await request(app)
      .delete(`/list/${list_id}`)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("deletedCount");
        expect(res.body.deletedCount).toBe(1);
      });

    await request(app)
      .get(`/list/${list_id}`)
      .set("Authorization", `Bearer ${user_token}`)
      .expect(404)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("errors");
      });
  });
  test("it should get error 401", async () => {
    await request(app)
      .delete("/list/123456789")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errors");
      });
  });

  test("it should get error 404", async () => {
    const user = {
      surname: "Petrásek",
      name: "Vojtěch",
      nickname: "test",
      email: "vojtechpetrasek@gmail.com",
      password: "testtest",
    };

    let user_token = "";

    await request(app)
      .post("/register")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        user_token = res.body.token;
      });

    await request(app)
      .delete("/list/123456789")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(404)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("errors");
      });
  });
});
