const users = require("express").Router();

const createUser = require("../controllers/users/createUser");
const loginUser = require("../controllers/users/loginUser");
const searchUser = require("../controllers/users/searchUser");
//const updateUser = require("../controllers/users/updateUser");
const userExtractor = require("../middleware/userExtractor");

users.get("/:id", async (req, res, next) => {
  try {
    //const { id } = req.params;
    const response = { message: "It does not work" };
    return res.status(501).json(response).end();
  } catch (error) {
    next(error);
  }
});

users.get("/", userExtractor, async (req, res, next) => {
  try {
    const users = await searchUser({});
    return res.status(200).json(users).end();
  } catch (error) {
    next(error);
  }
});

users.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await loginUser({ email, password });
    return res.status(201).json(newUser).end();
  } catch (error) {
    next(error);
  }
});

users.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUser({ email, password });
    return res.status(201).json(newUser).end();
  } catch (error) {
    next(error);
  }
});

users.put("/", async (req, res, next) => {
  try {
    const response = { message: "It does not work" };
    return res.status(501).json(response).end();
  } catch (error) {
    next(error);
  }
});

users.delete("/", async (req, res, next) => {
  try {
    const response = { message: "It does not work" };
    return res.status(501).json(response).end();
  } catch (error) {
    next(error);
  }
});

module.exports = users;
