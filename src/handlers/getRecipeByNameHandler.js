const {
  getRecipeByName,
  getAllRecipe,
} = require("../controllers/getRecipeByName");

const getRecipeByNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let results = name ? await getRecipeByName(name) : await getAllRecipe();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getRecipeByNameHandler,
};
