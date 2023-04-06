const { postRecipe } = require("../controllers/postRecipe");

const postRecipeHandler = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;

  try {
    const recipe = await postRecipe(
      name,
      image,
      summary,
      healthScore,
      steps,
      diets
    );

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { postRecipeHandler };
