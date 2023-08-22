const { User, conn } = require("../../src/db.js");
const session = require("supertest-session");
const app = require("../../src/app");
const agent = session(app);
const { expect } = require("chai");
const { Op } = require("sequelize");

const user1 = {
  email: "Test1@mail.com",
  password: "Test123456",
};

describe("----- User routes: -----", () => {
  before(() => checkConnection());

  describe("\n  -> POST /users", () => {
    describe("\n    - Should respond error if data is missing:\n", () => {
      it("Should respond with status 400 if email is missing", async () => {
        const res = await agent
          .post("/users")
          .send({ password: user1.password });
        expect(res.statusCode).to.equal(400);
      });

      it("Should respond with status 400 if password is missing", async () => {
        const res = await agent.post("/users").send({ email: user1.email });
        expect(res.statusCode).to.equal(400);
      });
    });

    describe("\n    - Should receive the user object if the data is correct:\n", () => {
      let res = {};

      const expectedProperties = {
        id: () =>
          expect(res.body.id, "id should be a string").to.be.a("string"),
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

    describe("\n    - Should reply error if the email already exists:\n", () => {
      it("Should respond with status 400", async () => {
        const res = await agent.post("/users").send(user1);
        expect(res.statusCode).to.equal(400);
      });
    });
  });

  after(async () => deleteTestData());
});

const checkConnection = () => {
  conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
};

const deleteTestData = async () => {
  // Elimina cualquier dato existente creado con la palabra clave 'Test'
  await User.destroy({ where: { email: { [Op.like]: "%Test%" } } });
};
