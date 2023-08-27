const { User, conn } = require("../../../db");
const dataValidator = require("./dataValidator");

const updateUser = async ({ id, email = "", password = "", name = null }) => {
  const validatedData = dataValidator({
    name,
    email,
    password,
  });

  // Inicia la transacción
  const transaction = await conn.transaction();

  try {
    const user = await User.findByPk(id, { transaction });
    if (!user)
      throw Object.assign(new Error(`User with id: ${id} not found.`), {
        status: 404,
      });
    await user.update(validatedData, { transaction });

    // Agrega relaciones
    //ej await user.setPosts(posts, { transaction });

    await transaction.commit(); // Confirma la transacción
    return user.toJSON();
  } catch (error) {
    if (transaction.finished !== "commit") await transaction.rollback();
    throw error;
  }
};
module.exports = updateUser;
