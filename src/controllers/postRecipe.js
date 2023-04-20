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
      servings,
      readyInMinutes,
    });
    if (diets && diets.length > 0) {
      const dietDb = await Diet.findAll({
        where: { name: diets },
      });
      recipe.addDiet(dietDb);
    }
    return recipe;
  } catch (error) {
    throw new Error("Could not create recipe: " + error.message);
  }
};

module.exports = { postRecipe };
