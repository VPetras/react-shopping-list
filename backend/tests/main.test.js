const request = require("supertest");
const app = require("../main");

require("dotenv").config();

describe("GET /", () => {
  test("It should respond with Hello World!", async () => {
    await request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", /text/)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello World!");
      });
  });
});
