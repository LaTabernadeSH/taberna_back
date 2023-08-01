const { Post } = require("../../../db");

// Función principal
const getAllPosts = async () => {
	let allPostsDB = await Post.findAll();
	return allPostsDB;
};
module.exports = getAllPosts;
