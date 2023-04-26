require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //sincronizamos la base de datos
  server.listen(port, () => {
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});

// eliminar todas las tablas y volverlas a crear com estén definidas en el modelo
// alter:true modificar las tablas ya existentes en base a como estén definidas en el modelo
