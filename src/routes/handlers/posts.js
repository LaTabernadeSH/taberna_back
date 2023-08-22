const posts = require("express").Router();

posts.get("/:id", async (req, res) => {
  //const { id } = req.params;
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

posts.get("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

posts.post("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(201).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

posts.put("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

posts.delete("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(204).json(response).end();
  } catch (error) {
    return res.status(400).json({ stack: error.stack }).end();
  }
});

module.exports = posts;
