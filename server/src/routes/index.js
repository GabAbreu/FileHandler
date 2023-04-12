const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const teste = require("../controller/teste.controller")

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.post("/remove/:name", controller.removeFile)
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.get('/teste', teste.teste)

  app.use(router);
};

module.exports = routes;
