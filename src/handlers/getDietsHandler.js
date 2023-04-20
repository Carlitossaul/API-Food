const { getDiets } = require("../controllers/getDiets");

const getDietsHandler = async (req, res) => {
  try {
    const dietas = await getDiets();

    return res.status(200).json(dietas);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
};
