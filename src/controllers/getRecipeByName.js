require("dotenv").config();
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5 } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

// let apiKey;

// switch (requestType) {
//   case "type_1":
//     apiKey = API_KEY;
//     break;
//   case "type_2":
//     apiKey = API_KEY2;
//     break;
//   case "type_3":
//     apiKey = API_KEY3;
//     break;
//   case "type_4":
//     apiKey = API_KEY4;
//     break;
//   default:
//     apiKey = API_KEY5;
// }

const cleanArray = (array) =>
  array.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      summary: elem.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions[0]?.steps
        .map((ste) => `${ste.number}. ${ste.step}`)
        .join("  "),
      diets: elem.diets,
      created: false,
    };
  });

const getAllRecipe = async () => {
  let recipesDataBase = await Recipe.findAll();

  let recipesApiRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY4}&number=100`
    )
  ).data.results;

  const recipesApi = cleanArray(recipesApiRaw);

  // if (recipesApi.length === 0) return recipesDataBase;

  return [...recipesDataBase, ...recipesApi];
};

const getRecipeByName = async (name) => {
  let recipesDataBase = await Recipe.findAll({
    where: !!name
      ? {
          name: {
            [Op.iLike]: `%${name}%`,
            // [Op.substring]: name.toLowerCase(),
          },
        }
      : {},
  });

  let recipesApiRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY3}&number=100&query=${name}`
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
