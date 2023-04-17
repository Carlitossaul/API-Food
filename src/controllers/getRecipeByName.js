require("dotenv").config();
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5 } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

let index = 0;

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
  let apiKey;
  switch (index) {
    case 0:
      apiKey = API_KEY;
      break;
    case 2:
      apiKey = API_KEY2;
      break;
    case 3:
      apiKey = API_KEY3;
      break;
    case 4:
      apiKey = API_KEY4;
      break;
    case 5:
      apiKey = API_KEY5;
      break;
    default:
      apiKey = API_KEY;
  }

  try {
    let recipesDataBase = await Recipe.findAll();

    let recipesApiRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey}&number=100`
      )
    ).data.results;

    const recipesApi = cleanArray(recipesApiRaw);
    return [...recipesDataBase, ...recipesApi];
  } catch (error) {
    index = (index + 1) % 5; // incrementa el valor de index y lo hace circular entre 0 y 4
    apiKey = [API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5][index]; // asigna la nueva clave de API en función de su valor actual
    return [];
  }
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
