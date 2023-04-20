const { getDetailById } = require("../controllers/getDetailById");

const getDetailByIdHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const receta = await getDetailById(id, source);

    return res.status(200).json(receta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDetailByIdHandler,
};
