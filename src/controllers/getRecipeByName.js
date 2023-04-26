require("dotenv").config();
const {
  API_KEY6,
  API_KEY7,
  API_KEY8,
  API_KEY9,
  API_KEY10,
  API_KEY11,
  API_KEY12,
  API_KEY13,
  API_KEY14,
  API_KEY15,
} = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

let index = 0;
let index2 = 0;

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
      Diets: elem.diets,
      created: false,
    };
  });

const getAllRecipe = async () => {
  let apiKey;
  switch (index) {
    case 0:
      apiKey = API_KEY6;
      break;
    case 2:
      apiKey = API_KEY7;
      break;
    case 3:
      apiKey = API_KEY8;
      break;
    case 4:
      apiKey = API_KEY9;
      break;
    case 5:
      apiKey = API_KEY10;
      break;
    default:
      apiKey = API_KEY6;
  }

  try {
    let recipesDataBaseRaw = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    let recipesDataBase = await recipesDataBaseRaw.map((recipe) => {
      let diets = recipe.Diets.map((elem) => elem.name);
      return { ...recipe.toJSON(), Diets: diets };
    });

    let recipesApiRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey}&number=100`
      )
    ).data.results;

    const recipesApi = cleanArray(recipesApiRaw);
    return [...recipesDataBase, ...recipesApi];
  } catch (error) {
    index = (index + 1) % 5; // incrementa el valor de index y lo hace circular entre 0 y 4
    apiKey = [API_KEY6, API_KEY7, API_KEY8, API_KEY9, API_KEY10][index]; // asigna la nueva clave de API en función de su valor actual
    throw new Error("Se acabaron las apikey disponibles");
  }
};

const getRecipeByName = async (name) => {
  let apiKey2;
  switch (index2) {
    case 0:
      apiKey2 = API_KEY11;
      break;
    case 2:
      apiKey2 = API_KEY12;
      break;
    case 3:
      apiKey2 = API_KEY13;
      break;
    case 4:
      apiKey2 = API_KEY14;
      break;
    case 5:
      apiKey2 = API_KEY15;
      break;
    default:
      apiKey2 = API_KEY11;
  }

  try {
    let recipesDataBase = await Recipe.findAll({
      where: !!name
        ? {
            name: {
              [Op.iLike]: `%${name}%`,
              // [Op.substring]: name.toLowerCase(),
            },
          }
        : {},
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    let recipesApiRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey2}&number=100&query=${name}`
      )
    ).data.results;

    const recipesApi = cleanArray(recipesApiRaw);

    let TheRecipesDB = await recipesDataBase.map((recipe) => {
      let diets = recipe.Diets.map((elem) => elem.name);
      return { ...recipe.toJSON(), Diets: diets };
    });

    return [...TheRecipesDB, ...recipesApi];
  } catch (error) {
    index2 = (index2 + 1) % 5; // incrementa el valor de index y lo hace circular entre 0 y 4
    apiKey2 = [API_KEY11, API_KEY12, API_KEY13, API_KEY14, API_KEY15][index2]; // asigna la nueva clave de API en función de su valor actual
    throw new Error("Se acabaron las apikey disponibles");
  }
};

module.exports = {
  getRecipeByName,
  getAllRecipe,
};

//   let filteredApi = await recipesApiRaw.filter((recipe) =>
//   recipe.name.toLowerCase() === name.toLowerCase()
// );
