const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const postRecipe = async (name, image, summary, healthScore, steps, diets) => {
  const [recipe, created] = await Recipe.findOrCreate({
    //aca lo crea al recipe en la base de datos
    where: {
      name,
      image,
      summary,
      healthScore,
      steps,
      // diets,
    },
  });
  const dietsToAdd = await Diet.findAll({
    where: {
      name: {
        [Op.in]: diets ? diets : [],
      },
    },
  });
  await recipe.addDiets(dietsToAdd);
  return recipe;
};

module.exports = {
  postRecipe,
};
