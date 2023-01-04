module.exports = app => {
  const outlets = require("../controllers/outlet.controller.js");

  var router = require("express").Router();

  // Create a new Outlet
  router.post("/", outlets.create);

  // Retrieve all Outlets
  router.get("/", outlets.findAll);

  // Retrieve all published Outlets
  router.get("/published", outlets.findAllPublished);

  // Retrieve a single Outlet with id
  router.get("/:id", outlets.findOne);

  // Update a Outlet with id
  router.put("/:id", outlets.update);

  // Delete a Outlet with id
  router.delete("/:id", outlets.delete);

  // Delete all Outlets
  router.delete("/", outlets.deleteAll);

  app.use("/api/outlets", router);
};
