const { User, conn } = require("../../../db");
const bcrypt = require("bcrypt");
const dataValidator = require("./dataValidator");

const updateUser = async ({ email = "", password = "" }) => {
  const validatedData = dataValidator({ email, password });
  validatedData.password = await bcrypt.hash(validatedData.password, 10);

  // Inicia la transacción
  const transaction = await conn.transaction();

  try {
    if (await User.findOne({ where: { email: email } }))
      throw Object.assign(new Error("User email already exists."), {
        name: "ValidationError",
      });

    const user = await User.create(validatedData, { transaction });

    await transaction.commit(); // Confirma la transacción
    return user.toJSON();
  } catch (error) {
    if (transaction.finished !== "commit") await transaction.rollback();
    throw error;
  }
};
module.exports = updateUser;
