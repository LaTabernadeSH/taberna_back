const { User, conn } = require("../../../db");
//const searchUser = require("./searchUser");

const updateUser = async ({ id, email, password, name = null }) => {
  const validatedData = control({
    name,
    email,
    password,
  });

  // Inicia la transacción
  const transaction = await conn.transaction();

  try {
    let user;
    if (id) {
      // Si llega id se actualiza el usuario
      user = await User.findByPk(id, { transaction });
      if (!user) throw new Error(`User with id: ${id} not found.`);
      await user.update(validatedData, { transaction });
    } else {
      // Si no llega id se crea el usuario
      if (await User.findOne({ where: { email: email } }))
        throw new Error("User email already exists.");
      user = await User.create(validatedData, { transaction });
    }
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

const control = (data) => {
  const regexName = /^[a-zA-Z0-9]+$/;
  const regexEmail = /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  //const regexURL = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

  if (!regexName.test(data.name)) {
    throw new Error("The name of the user cannot contain special characters.");
  }
  if (!regexEmail.test(data.email)) {
    throw new Error("The email of the user must be a valid email.");
  }
  return data;
};
