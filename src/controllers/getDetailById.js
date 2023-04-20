require("dotenv").config();
const { API_KEY21, API_KEY22, API_KEY23, API_KEY24, API_KEY25 } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");

let apikey = "78c5b6e91ab7481da11c4288b21acaa7";
let index = 0;
const getDetailById = async (id, source) => {
  let apiKey;
  switch (index) {
    case 0:
      apiKey = API_KEY21;
      break;
    case 2:
      apiKey = API_KEY22;
      break;
    case 3:
      apiKey = API_KEY23;
      break;
    case 4:
      apiKey = API_KEY24;
      break;
    case 5:
      apiKey = API_KEY25;
      break;
    default:
      apiKey = API_KEY21;
  }
  try {
    if (source === "api") {
      id = Number(id);
      let response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?addRecipeInformation=true&apiKey=${apikey}`
      );
      let recipe = {
        id: response.data.id,
        name: response.data.title,
        image: response.data.image,
        summary: response.data.summary.replaceAll(
          /<(“[^”]”|'[^’]’|[^'”>])*>/g,
          ""
        ),
        healthScore: response.data.healthScore,
        steps: response.data.analyzedInstructions[0]?.steps
          .map((ste) => `${ste.number}. ${ste.step}`)
          .join("  "),
        Diets: response.data.diets,
        created: false,
        servings: response.data.servings,
        readyInMinutes: response.data.readyInMinutes,
      };
      return recipe;
    } else {
      let receta = await Recipe.findByPk(id, {
        include: [
          {
            model: Diet,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const arrayTheDiets = await receta.Diets.map((diet) => diet.name);
      console.log(arrayTheDiets);
      return { ...receta.toJSON(), Diets: arrayTheDiets };
    }
  } catch (error) {
    index = (index + 1) % 5; // incrementa el valor de index y lo hace circular entre 0 y 4
    apiKey = [API_KEY21, API_KEY22, API_KEY23, API_KEY24, API_KEY25][index]; // asigna la nueva clave de API en función de su valor actual
    return ["Hola entre en el error..."];
  }
};

module.exports = {
  getDetailById,
};
