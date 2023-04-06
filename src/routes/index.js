const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { getDietsHandler } = require("../handlers/getDietsHandler");
const { getDetailByIdHandler } = require("../handlers/getDetailByIdHandler");
const { postRecipeHandler } = require("../handlers/postRecipeHandler");
const {
  getRecipeByNameHandler,
} = require("../handlers/getRecipeByNameHandler");

router.get("/recipes/:id", getDetailByIdHandler);
router.get("/recipes", getRecipeByNameHandler);
router.post("/recipes", postRecipeHandler);
router.get("/diets", getDietsHandler);

module.exports = router;
