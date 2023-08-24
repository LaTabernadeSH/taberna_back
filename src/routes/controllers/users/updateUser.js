const { User, conn } = require("../../../db");
//const searchUser = require("./searchUser");

const updateUser = async ({ id, email = "", password = "", name = null }) => {
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
      if (!user)
        throw Object.assign(new Error(`User with id: ${id} not found.`), {
          status: 404,
        });
      await user.update(validatedData, { transaction });
    } else {
      // Si no llega id se crea el usuario
      if (await User.findOne({ where: { email: email } }))
        throw Object.assign(new Error("User email already exists."), {
          name: "ValidationError",
        });
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
    throw Object.assign(
      new Error("The name of the user cannot contain special characters."),
      {
        name: "ValidationError",
      }
    );
  }
  if (!regexEmail.test(data.email)) {
    throw Object.assign(
      new Error("The email of the user must be a valid email."),
      {
        name: "ValidationError",
      }
    );
  }
  if (!regexName.test(data.password)) {
    throw Object.assign(new Error("The password missing or invalid."), {
      name: "ValidationError",
    });
  }
  return data;
};
