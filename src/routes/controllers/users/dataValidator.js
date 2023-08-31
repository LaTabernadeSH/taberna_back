const dataValidator = (data) => {
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

  if (!data.email.length) {
    throw Object.assign(new Error("email"), { name: "BadRequest" });
  }
  if (!regexEmail.test(data.email)) {
    throw Object.assign(
      new Error("The email of the user must be a valid email."),
      {
        name: "ValidationError",
      }
    );
  }

  if (!data.password.length) {
    throw Object.assign(new Error("password"), { name: "BadRequest" });
  }
  if (!regexName.test(data.password)) {
    throw Object.assign(new Error("The password missing or invalid."), {
      name: "ValidationError",
    });
  }
  return data;
};

module.exports = dataValidator;
