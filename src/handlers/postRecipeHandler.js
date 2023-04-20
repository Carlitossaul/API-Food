const { postRecipe } = require("../controllers/postRecipe");

const postRecipeHandler = async (req, res) => {
  const {
    name,
    image,
    summary,
    healthScore,
    steps,
    diets,
    servings,
    readyInMinutes,
  } = req.body;

  try {
    const recipe = await postRecipe(
      name,
      image,
      summary,
      healthScore,
      steps,
      diets,
      servings,
      readyInMinutes
    );

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { postRecipeHandler };
