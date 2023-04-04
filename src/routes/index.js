const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDetail, searchByName } = require("../middelwares/recipesRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:id", getDetail);
router.get("/recipes", searchByName);

module.exports = router;
