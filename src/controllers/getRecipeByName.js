require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

const cleanArray = (array) =>
  array.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      summary: elem.summary,
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions?.[0]?.steps?.map((e) => e.step),
      diets: elem.diets,
      created: false,
    };
  });

const getAllRecipe = async () => {
  let recipesDataBase = await Recipe.findAll();

  let recipesApiRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`
    )
  ).data.results;

  const recipesApi = cleanArray(recipesApiRaw);

  return [...recipesDataBase, ...recipesApi];
};

const getRecipeByName = async (name) => {
  let recipesDataBase = await Recipe.findAll({
    where: !!name
      ? {
          name: {
            [Op.substring]: name.toLowerCase(),
          },
        }
      : {},
  });

  let recipesApiRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100&query=${name}`
    )
  ).data.results;

  const recipesApi = cleanArray(recipesApiRaw);

  return [...recipesApi, ...recipesDataBase];
};

module.exports = {
  getRecipeByName,
  getAllRecipe,
};

//   let filteredApi = await recipesApiRaw.filter((recipe) =>
//   recipe.name.toLowerCase() === name.toLowerCase()
// );
