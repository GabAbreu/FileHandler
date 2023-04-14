const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/upload", controller.upload)
  router.delete("/remove/:name", controller.removeFile)
  router.get("/files", controller.getListFiles)
  router.get("/files/:name", controller.download)
  app.use(router);
};

module.exports = routes;
