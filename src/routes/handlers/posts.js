const posts = require("express").Router();

posts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ stack: error.stack });
  }
});

posts.get("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ stack: error.stack });
  }
});

posts.post("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ stack: error.stack });
  }
});

posts.put("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ stack: error.stack });
  }
});

posts.delete("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(204).json(response);
  } catch (error) {
    return res.status(400).json({ stack: error.stack });
  }
});

module.exports = posts;
