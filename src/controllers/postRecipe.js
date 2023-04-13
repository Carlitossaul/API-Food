const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const postRecipe = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets,
  readyInMinutes,
  servings
) => {
  try {
    const recipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      diets,
      servings,
      readyInMinutes,
    });

    if (diets) {
      const dietsToAdd = await Diet.findAll({
        where: {
          name: diets,
        },
      });
      for (let i = 0; i < dietsToAdd.length; i++) {
        await recipe.addDiet(dietsToAdd[i]);
      }
    }

    return recipe;
  } catch (error) {
    throw new Error("Could not create recipe: " + error.message);
  }
};

module.exports = { postRecipe };
