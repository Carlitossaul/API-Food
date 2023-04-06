const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  searchByName,
  postRecipe,
  getDiets,
} = require("../handlers/recipesRoute");
const { getDetailByIdHandler } = require("../handlers/getDetailByIdHandler");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:id", getDetailByIdHandler);
router.get("/recipes", searchByName);
router.post("/recipes", postRecipe);
router.get("/diets", getDiets);

module.exports = router;
