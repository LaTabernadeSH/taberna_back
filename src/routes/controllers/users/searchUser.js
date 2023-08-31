const { User } = require("../../../db");

// Función principal
const searchUser = async ({ id, name }) => {
  if (id) return await getUserById(id);
  return getUsers(name);
};
module.exports = searchUser;

const getUserById = async (id) => {
  const user = await User.findByPk(id, {});

  if (!user) throw Error(`user with id: ${id} not found.`);

  return user.toJSON();
};

const getUsers = async (name) => {
  let whereCondition = {};
  if (name) {
    if (typeof name !== "string" || !name.trim())
      throw Error("The name must be a non-empty string");

    whereCondition = { name: { [Op.iLike]: `%${name}%` } };
  }

  const usersDB = await User.findAll({ where: whereCondition });
  const users = usersDB.map((user) => user.toJSON());
  return users;
};
