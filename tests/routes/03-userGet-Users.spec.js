const { User } = require("../../src/db.js");
const session = require("supertest-session");
const app = require("../../src/app.js");
const agent = session(app);
const { expect } = require("chai");

const { checkConnection, deleteTestData } = require("../helpers.js");

const user1 = {
  email: "Test@mail.com",
  password: "Test123456",
};

describe("----- Route GET(/users): -----\n", () => {
  before(() => checkConnection());

  describe("-> Should respond error if data is missing:", () => {
    it("Should respond with status 401 if token is missing", async () => {
      const res = await agent.get("/users");
      expect(res.statusCode).to.equal(401);
    });

    it("Should respond with the 401 status if the token is incomplete", async () => {
      const res = await agent.get("/users").set("Authorization", "Bearer ");
      expect(res.statusCode).to.equal(401);
    });

    it("Should respond with the 401 status if the token is invalid", async () => {
      const res = await agent
        .get("/users")
        .set(
          "Authorization",
          "Bearer aleatorioJIUzI1NiIsInR5cCI6IkpXCVI9.eyJpZCI6ImU1MDA4YWU4LTk2MmEtNDRiZS1hOTZiLTQzMjdjZWIyYjkwMyIsImVtYWlsIjoicHJ1ZWJhQG1haWwuY29tIiwiaWF0IjoxNjkzNTEzNjQ5LCJleHAiOjE2OTQxMTg0NDl9.mrgWmB90z19_D6M1B0gLdapM9ueN0JfzBaiNEWSPcqY"
        );
      expect(res.statusCode).to.equal(401);
    });
  });

  describe("-> Should receive the user object if the data is correct:", () => {
    let res = {};

    it("Should respond with 201 status when login", async () => {
      await agent.post("/users").send(user1);
      res = await agent.post("/users/login").send(user1);
      expect(res.status).to.equal(201, "Unexpected status code");
      expect(res.body).to.be.an("object");
    });

    it("Should respond with the 201 status if the token is correct", async () => {
      const res1 = await agent
        .get("/users")
        .set("Authorization", `Bearer ${res.body.token}`);
      expect(res1.statusCode).to.equal(200);
      expect(res1.body).to.be.an("array");
    });
  });
  after(async () => await deleteTestData([User]));
});
