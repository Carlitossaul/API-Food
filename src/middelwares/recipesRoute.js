require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diets } = require("../db");

const getDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?addRecipeInformation=true&apiKey=${API_KEY}`
  );

  try {
    let recipe = {
      id: response.data.id, //evaluar si es este id o el que genera unicos
      name: response.data.title,
      image: response.data.image,
      summary: response.data.summary, //resumen
      healthScore: response.data.healthScore,
      steps: response.data.analyzedInstructions[0]?.steps.map((e) => e.step),
      diets: response.data.diets,
    };
    return res.status(200).json(recipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Hubo un error al procesar la respuesta de la API" });
  }
};

const getDetalle = async (req, res) => {
  const { id } = req.body;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?addRecipeInformation=true&apiKey=${API_KEY}`
  );
  if (response && response.data) {
    // Verifica si la respuesta es exitosa y si contiene datos
    try {
      const recipe = {
        id: response.data.id,
        title: response.data.title,
        image: response.data.image,
        // Agrega las demás propiedades que necesites aquí
      };
      res.json(recipe);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al procesar la respuesta de la API" });
    }
  } else {
    res.status(404).json({
      message: "No se encontró información para la receta especificada",
    });
  }
};

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

const postRecipe = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;

  try {
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
    return res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error });
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
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getDetail,
  searchByName,
  postRecipe,
  getDiets,
};
