const { User } = require("../../src/db.js");
const session = require("supertest-session");
const app = require("../../src/app.js");
const agent = session(app);
const { expect } = require("chai");

const { checkConnection, deleteTestData } = require("../helpers.js");

const user1 = {
  email: "Test1@mail.com",
  password: "Test123456",
};

describe("----- Route POST(/users): -----\n", () => {
  before(() => checkConnection());

  describe("-> Should respond error if data is missing:", () => {
    it("Should respond with status 409 if email is missing", async () => {
      const res = await agent.post("/users").send({ password: user1.password });
      expect(res.statusCode).to.equal(409);
    });

    it("Should respond with status 409 if password is missing", async () => {
      const res = await agent.post("/users").send({ email: user1.email });
      expect(res.statusCode).to.equal(409);
    });
  });

  describe("-> Should receive the user object if the data is correct:", () => {
    let res = {};

    const expectedProperties = {
      id: () => expect(res.body.id, "id should be a string").to.be.a("string"),
      admin: () =>
        expect(res.body.admin, "admin should be false").to.equal(false),
      email: () =>
        expect(res.body.email, "email should be a string").to.be.a("string"),
      name: () => expect(res.body.name, "name should be null").to.equal(null),
      lastName: () =>
        expect(res.body.lastName, "lastName should be null").to.equal(null),
      userName: () =>
        expect(res.body.userName, "userName should be null").to.equal(null),
      image: () =>
        expect(res.body.image, "image should be null").to.equal(null),
      linkedin: () =>
        expect(res.body.linkedin, "linkedin should be null").to.equal(null),
      github: () =>
        expect(res.body.github, "github should be null").to.equal(null),
      twitter: () =>
        expect(res.body.twitter, "twitter should be null").to.equal(null),
      whatsapp: () =>
        expect(res.body.whatsapp, "whatsapp should be null").to.equal(null),
    };

    it("Should respond with 201 status", async () => {
      res = await agent.post("/users").send(user1);
      expect(res.status).to.equal(201, "Unexpected status code");
      expect(res.body).to.be.an("object");
    });

    it("Should receive the same number of properties as expected", () => {
      const resProperties = Object.keys(res.body);
      const expectedProps = Object.keys(expectedProperties);
      const extraProperties = resProperties.filter(
        (prop) => !expectedProps.includes(prop)
      );
      const missingProperties = expectedProps.filter(
        (prop) => !resProperties.includes(prop)
      );

      let errorMessage = "";

      if (extraProperties.length > 0)
        errorMessage += `\n - Extra properties found: ${extraProperties.join(
          ", "
        )}`;

      if (missingProperties.length > 0)
        errorMessage += `\n - Missing properties: ${missingProperties.join(
          ", "
        )}`;

      if (errorMessage.length > 0) throw new Error(errorMessage);
    });

    it("Should receive the same property types as expected", () => {
      for (const property in res.body) {
        expectedProperties[property]();
      }
    });
  });

  describe("-> Should reply error if the email already exists:", () => {
    it("Should respond with status 409", async () => {
      const res = await agent.post("/users").send(user1);
      expect(res.statusCode).to.equal(409);
    });
  });

  after(async () => await deleteTestData([User]));
});
