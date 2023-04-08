const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const postRecipe = async (name, image, summary, healthScore, steps, diets) => {
  try {
    const recipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      diets,
    });

    if (diets) {
      const dietsToAdd = await Diet.findAll({
        where: {
          name: diets,
        },
      });
      for (let i = 0; i < dietsToAdd.length; i++) {
        await recipe.addDiet(dietsToAdd[i]); // agregamos cada dieta encontrada a la receta
      }
    }

    return recipe;
  } catch (error) {
    throw new Error("Could not create recipe: " + error.message);
  }
};

module.exports = { postRecipe };
