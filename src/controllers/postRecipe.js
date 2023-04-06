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
      await recipe.addDiets(dietsToAdd); // a lo que creamos le agregamos lo que conincidio con el nombre
    }

    return recipe;
  } catch (error) {
    throw new Error("Could not create recipe: " + error.message);
  }
};

module.exports = { postRecipe };
