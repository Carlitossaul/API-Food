require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Diet } = require("../db");

const { getDiets } = require("../controllers/getDiets");

const getDietsHandler = async (req, res) => {
  try {
    // Obtener las dietas de la API
    const apiDietsRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      )
    ).data.results;

    // Guardar las dietas en la base de datos
    await Promise.all(
      apiDietsRaw.map(async (recipe) => {
        await Promise.all(
          recipe.diets.map(async (dietName) => {
            await Diet.findOrCreate({
              where: { name: dietName },
              defaults: { name: dietName },
            });
          })
        );
      })
    );

    // Obtener todas las dietas existentes de la base de datos y retornarlas como un arreglo
    const diets = await Diet.findAll();
    const dietNames = diets.map((diet) => diet.name);
    return res.status(200).json(dietNames);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
};
