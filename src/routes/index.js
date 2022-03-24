const { Router } = require("express");
const router = Router();
const mysql = require("mysql");
const configBD = require("./database.json");
const clasificacionData = require("./clasificacion.json");
const conexion = mysql.createConnection({
  host: configBD.Host,
  database: configBD.name,
  user: configBD.user,
  password: configBD.password,
  port: configBD.Portnumber,
});

//routes getters
router.get("/clasificacion", (request, response) => {
  response.json(clasificacionData);
});
router.get("/categorias", (request, response) => {
  conexion.query("SELECT * FROM Categoria", function (error, results, fields) {
    if (error) {
      throw error;
    }
    response.json(results);
  });
});
router.get("/flujo", (request, response) => {
  conexion.query(
    "SELECT * FROM FlujoEfectivo",
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      response.json(results);
    }
  );
});
router.get("/indicadores", (request, response) => {
  conexion.query(
    "SELECT * FROM IndicadoresDinero",
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      response.json(results);
    }
  );
});
router.get("/reportes", (request, response) => {
  const data = {
    message: "Works",
  };
  response.json(data);
});

//router post

router.post("/categorias", (request, response) => {
  const { clasificacion, categoria, subCategoria } = request.body;
  if (clasificacion && categoria && subCategoria) {
    const newCategoria = { ...request.body };
    conexion.query(
      "Insert into Categoria (categoria,clasificacion,subCategoria) values (?,?,?)",
      [categoria, clasificacion, subCategoria],
      function (error, results, fields) {
        console.log(request.body,' post');
        if (error) {
          throw error;
        }
        response.json(results);
      }
    );
  }
});

router.post("/flujo", (request, response) => {
  const { fecha, tipo, categoria, descripcion, cantidad } = request.body;
  if (fecha && tipo && categoria && descripcion && cantidad) {
    const newFlujo = { ...request.body };
    conexion.query(
      "Insert into FlujoEfectivo (fecha,categoria,descripcion,monto) values (?,?,?,?)",
      [fecha, categoria, descripcion, cantidad],
      function (error, results, fields) {
        console.log(request.body,' post');
        if (error) throw error;
        response.json(results);
      }
    );
  }
});

module.exports = router;
