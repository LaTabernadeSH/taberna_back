const { User, conn } = require("../../src/db.js");
const session = require("supertest-session");
const app = require("../../src/app");
const agent = session(app);
const { expect } = require("chai");
const { Op } = require("sequelize");

describe("----- User routes: -----", () => {
  before(() => checkConnection());

  describe("\n  -> POST /users", () => {
    describe("\n    - Should respond error if data is missing\n", () => {
      it("Should respond with status 400 if email are missing", async () => {
        const res = await agent.post("/users").send({ password: "123456" });
        expect(res.statusCode).to.equal(400);
      });

      it("Should respond with status 400 if password are missing", async () => {
        const res = await agent.post("/users").send({ email: "Test@mail.com" });
        expect(res.statusCode).to.equal(400);
      });
    });

    describe("\n    - Should receive the user object if the data is correct\n", async () => {
      let res = {};

      const expectedProperties = {
        id: () => expect(res.body.id).to.be.a("string"),
        admin: () => expect(res.body.admin).to.equal(false),
        email: () => expect(res.body.email).to.be.a("string"),
        name: () => expect(res.body.name).to.equal(null),
        lastName: () => expect(res.body.lastName).to.equal(null),
        userName: () => expect(res.body.userName).to.equal(null),
        image: () => expect(res.body.image).to.equal(null),
        linkedin: () => expect(res.body.linkedin).to.equal(null),
        github: () => expect(res.body.github).to.equal(null),
        twitter: () => expect(res.body.twitter).to.equal(null),
        whatsapp: () => expect(res.body.whatsapp).to.equal(null),
      };

      it("Should respond with 201 status", async () => {
        res = await agent
          .post("/users")
          .send({ email: "Test@mail.com", password: "123456" });
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
      });

      it("Should receive the same number of properties as expected", () => {
        const resProperties = Object.keys(res.body);
        const expectedProps = Object.keys(expectedProperties);
        let errorMessage = "";

        // Verificar si hay propiedades en res.body que no están en expectedProperties
        const extraProperties = resProperties.filter(
          (prop) => !expectedProps.includes(prop)
        );

        // Verificar si faltan propiedades en expectedProperties que están en res.body
        const missingProperties = expectedProps.filter(
          (prop) => !resProperties.includes(prop)
        );

        // Comprobar si hay diferencias y mostrar mensajes de error personalizados
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
        // Comprobar si las propiedades son del tipo esperado
        for (const property in res.body) {
          expectedProperties[property]();
        }
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
  // Elimina cualquier dato existente creado con palabra clave 'Test'
  await User.destroy({ where: { email: { [Op.like]: "%Test%" } } });
};
