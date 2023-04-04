const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getDetail,
  searchByName,
  postRecipe,
  getDiets,
} = require("../middelwares/recipesRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:id", getDetail);
router.get("/recipes", searchByName);
router.post("/recipes", postRecipe);
router.get("/diets", getDiets);

module.exports = router;
