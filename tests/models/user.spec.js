const { User, conn } = require("../../src/db.js");
const { expect } = require("chai");
const { Op } = require("sequelize");

describe("----- User model: -----", () => {
  before(() => checkConnection());

  describe("\n    - Attributes definition", () => {
    it("Should have the following attributes: id, admin, email, password, name, lastName, userName, password, linkedin, github, twitter, whatsapp", () => {
      expect(User.tableAttributes).to.have.property("id");
      expect(User.tableAttributes).to.have.property("admin");
      expect(User.tableAttributes).to.have.property("email");
      expect(User.tableAttributes).to.have.property("password");
      expect(User.tableAttributes).to.have.property("name");
      expect(User.tableAttributes).to.have.property("lastName");
      expect(User.tableAttributes).to.have.property("userName");
      expect(User.tableAttributes).to.have.property("password");
      expect(User.tableAttributes).to.have.property("linkedin");
      expect(User.tableAttributes).to.have.property("github");
      expect(User.tableAttributes).to.have.property("twitter");
      expect(User.tableAttributes).to.have.property("whatsapp");
    });

    it("Should have a false enableNull constraint on the attributes: id, admin, email, password", () => {
      expect(User.tableAttributes.id.allowNull).to.be.false;
      expect(User.tableAttributes.admin.allowNull).to.be.false;
      expect(User.tableAttributes.email.allowNull).to.be.false;
      expect(User.tableAttributes.password.allowNull).to.be.false;
    });

    it("Should default the admin attribute to false", () => {
      expect(User.tableAttributes.admin.defaultValue).to.equal(false);
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
