const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const usersRouter = require("./handlers/users");
const postsRouter = require("./handlers/posts");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

// Ruta por defecto
router.get("/", (req, res) => {
	const response = { message: "Server is active!" };
	return res.status(200).json(response);
});

module.exports = router;
