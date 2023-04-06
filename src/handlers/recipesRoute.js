require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diets } = require("../db");

const searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`
    );
    return res.status(200).json(response.data.results);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Hubo un error al procesar la respuesta de la API" });
  }
};

const getDiets = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?diet=whole30|ketogenic|vegetarian|lacto-vegetarian|ovo-vegetarian|vegan|pescetarian|paleo|primal|gluten free|dairy free|lactose intolerant|ovo-lacto vegetarian&apiKey=${API_KEY}`
    );
    console.log(response.data);
    // const totalDiets = await Diets.bulkCreate(response.data.results);
    // return res.status(200).json(totalDiets);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  searchByName,
  getDiets,
};
