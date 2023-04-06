require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");

const getDetailById = async (id, source) => {
  if (source === "api") {
    let response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?addRecipeInformation=true&apiKey=${API_KEY}`
    );
    let recipe = {
      id: response.data.id, //evaluar si es este id o el que genera unicos
      name: response.data.title,
      image: response.data.image,
      summary: response.data.summary, //resumen
      healthScore: response.data.healthScore,
      steps: elem.analyzedInstructions?.[0]?.steps?.map((e) => e.step),
      dieta: response.data.diets,
      created: false,
      // diets: response.data.diets.map((element) => ({ name: element })),
    };
    return recipe;
  } else {
    let receta = await Recipe.findByPk(id);
    return receta;
  }
};

module.exports = {
  getDetailById,
};