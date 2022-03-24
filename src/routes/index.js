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
    "SELECT * FROM FlujoEfectivo INNER JOIN Categoria on FlujoEfectivo.categoria=Categoria.idCategoria",
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
  console.log(request.body);
  const newCategoria = { ...request.body };
  conexion.query(
    "Insert into Categoria (categoria,clasificacion,subCategoria) values (?,?,?)",
    [
      newCategoria.categoria.categoria,
      newCategoria.categoria.clasificacion,
      newCategoria.categoria.subCategoria,
    ],
    function (error, results, fields) {
      response.json(results);
      console.log(request.body, " post");
      if (error) {
        throw error;
      }
    }
  );
});

router.post("/flujo", (request, response) => {
  const newFlujo = { ...request.body };

  conexion.query(
    "Insert into FlujoEfectivo (fecha,categoria,descripcion,monto) values (?,?,?,?)",
    [
      newFlujo.flujo.fecha,
      newFlujo.flujo.categoria,
      newFlujo.flujo.descripcion,
      newFlujo.flujo.cantidad,
    ],
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        console.log(results, " post");
        response.json(results);
      }
    }
  );
});
router.post("/indicadores", (request, response) => {
  const newInd = { ...request.body };
  console.log(request.body);
  conexion.query(
    "Insert into IndicadoresDinero (tipoIndicador,numeroSemana,razonSocial,monto,fecha) values (?,?,?,?,?)",
    [newInd.indice.tipoIndicador, newInd.indice.numeroSemana,newInd.indice. razonSocial, newInd.indice.monto, newInd.indice.fecha],
    function (error, results, fields) {
      console.log(request.body, " post");
      if (error) throw error;
      response.json(results);
    }
  );
});

module.exports = router;
