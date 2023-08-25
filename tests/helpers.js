const { conn } = require("../src/db.js");
const { Op } = require("sequelize");

const checkConnection = () => {
  conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
};

const deleteTestData = async (models) => {
  // Elimina cualquier dato existente creado con la palabra clave 'Test'
  for (const model of models)
    await model.destroy({ where: { email: { [Op.like]: "%Test%" } } });
};

module.exports = {
  checkConnection,
  deleteTestData,
};
