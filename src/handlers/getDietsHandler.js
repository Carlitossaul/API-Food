require("dotenv").config();
const { API_KEY, API_KEY4 } = process.env;
const axios = require("axios");
const { Diet } = require("../db");

const { getDiets } = require("../controllers/getDiets");

const getDietsHandler = async (req, res) => {
  try {
    const apiDietsRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&number=100&addRecipeInformation=true`
      )
    ).data.results;

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
