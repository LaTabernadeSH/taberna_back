const users = require("express").Router();

const searchUser = require("../controllers/users/searchUser");
const updateUser = require("../controllers/users/updateUser");

users.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const response = { message: "It does not work" };
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ stack: error.stack });
	}
});

users.get("/", async (req, res) => {
	try {
		const users = await searchUser({});
		return res.status(200).json(users);
	} catch (error) {
		return res.status(400).json({ stack: error.stack });
	}
});

users.post("/", async (req, res) => {
	try {
		const data = req.body;
		console.log(data);
		const user = await updateUser({ name: data.name });
		return res.status(201).json(user);
	} catch (error) {
		return res.status(400).json({ stack: error.stack });
	}
});

users.put("/", async (req, res) => {
	try {
		const response = { message: "It does not work" };
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ stack: error.stack });
	}
});

users.delete("/", async (req, res) => {
	try {
		const response = { message: "It does not work" };
		return res.status(204).json(response);
	} catch (error) {
		return res.status(400).json({ stack: error.stack });
	}
});

module.exports = users;
