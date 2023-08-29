const { User } = require("../../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async ({ email = "", password = "" }) => {
  const user = await User.findOne({ where: { email } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !passwordCorrect) {
    throw Object.assign(new Error("Invalid user or password."), {
      name: "ValidationError",
    });
  }

  const userForToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24 * 7, //Tiempo de expiración en seg
  });

  return {
    ...user.toJSON(),
    token,
  };
};
module.exports = loginUser;

// Lectura de interés:
// https://developer.mozilla.org/es/docs/Web/HTTP/Authentication
