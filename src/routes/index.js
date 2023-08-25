const { Router } = require("express");

const router = Router();
// Importar todos los routers;
const usersRouter = require("./handlers/users");
const postsRouter = require("./handlers/posts");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors.js");

// Ruta principal
router.get("/", (_req, res) => {
  return res.status(200).send("<h1>Server is active!</h1>");
});

// Configurar los routers
router.use("/users", usersRouter);
router.use("/posts", postsRouter);

router.use(notFound);
router.use(handleErrors);

module.exports = router;
