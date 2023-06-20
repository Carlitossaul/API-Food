const { Recipe, Diet } = require("../db");

const postRecipe = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets,
  servings,
  readyInMinutes
) => {
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
};

module.exports = { postRecipe };
