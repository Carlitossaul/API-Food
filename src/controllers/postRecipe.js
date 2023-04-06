const { Recipe } = require("../db");

const postRecipe = async (name, image, summary, healthScore, steps, diets) => {
  const [recipe, created] = await Recipe.findOrCreate({
    //aca lo crea al recipe en la base de datos
    where: {
      name,
      image,
      summary,
      healthScore,
      steps,
      diets,
    },
  });
  return recipe;
};

module.exports = {
  postRecipe,
};
