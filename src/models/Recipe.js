const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      //define es un metodo de sequalize que me va aprmitir definir un modelo.
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, //Esto generará una nueva receta con un ID único generado por UUID.
      },
      name: {
        type: DataTypes.STRING, //DataTypes tipo de dato
        allowNull: false, //permitir valores nulos?
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        //resumen del plato
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      steps: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      timestamps: false, //para que no aparezca createdAt en la consola
      updatedAt: false, //para que no aparezca updateAt en la consola
    }
  );
};

// el modelo es como un molde de los registros que yo quiero crear.
// el modelo es trbajado como un objeto y no como una tabla en postrgres
// una cosa va a caer en la otra
