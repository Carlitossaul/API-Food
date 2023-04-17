require("dotenv").config();
const { API_KEY16, API_KEY17, API_KEY18, API_KEY19, API_KEY20 } = process.env;
const axios = require("axios");
const { Diet } = require("../db");

const { getDiets } = require("../controllers/getDiets");

let index = 0;
const getDietsHandler = async (req, res) => {
  let apiKey;
  switch (index) {
    case 0:
      apiKey = API_KEY16;
      break;
    case 2:
      apiKey = API_KEY17;
      break;
    case 3:
      apiKey = API_KEY18;
      break;
    case 4:
      apiKey = API_KEY19;
      break;
    case 5:
      apiKey = API_KEY20;
      break;
    default:
      apiKey = API_KEY16;
  }
  try {
    const apiDietsRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`
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
    index = (index + 1) % 5; // incrementa el valor de index y lo hace circular entre 0 y 4
    apiKey = [API_KEY16, API_KEY17, API_KEY18, API_KEY19, API_KEY20][index]; // asigna la nueva clave de API en función de su valor actual
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
};
