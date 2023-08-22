const users = require("express").Router();

const searchUser = require("../controllers/users/searchUser");
const updateUser = require("../controllers/users/updateUser");

users.get("/:id", async (req, res) => {
  //const { id } = req.params;
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

users.get("/", async (req, res) => {
  try {
    const users = await searchUser({});
    return res.status(200).json(users).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

users.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await updateUser({ email, password });
    return res.status(201).json(newUser).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

users.put("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

users.delete("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(204).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

module.exports = users;
