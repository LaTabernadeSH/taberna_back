const { User, conn } = require("../../../db");
const searchUser = require("./searchUser");

const updateUser = async ({ id, name }) => {
	// Inicia la transacción
	const transaction = await conn.transaction();

	const validatedData = control({
		name,
	});

	try {
		let user;
		if (id) {
			// Si llega id se actualiza el usuario
			user = await User.findByPk(id, { transaction });
			if (!user) throw new Error(`User with id: ${id} not found.`);
			await user.update(validatedData, { transaction });
		} else {
			// Si no llega id se crea el usuario
			if (await User.findOne({ where: { name: name } }))
				throw new Error("User name already exists.");
			user = await User.create(validatedData, { transaction });
		}
		// Agrega relaciones
		// ej await user.setPosts(posts, { transaction });

		// Confirma la transacción
		await transaction.commit();

		// Devuelve el usuario
		const newUser = await searchUser({ id: user.id });
		return newUser;
	} catch (error) {
		if (transaction.finished !== "commit") {
			await transaction.rollback();
		}
		throw error;
	}
};
module.exports = updateUser;

const control = (data) => {
	const regexName = /^[a-zA-Z0-9]+$/;
	const regexURL = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

	if (!regexName.test(data.name)) {
		throw new Error("The name of the user cannot contain special characters.");
	}
	return data;
};
