module.exports = app => {
  const taxs = require("../controllers/tax.controller.js");

  var router = require("express").Router();

  // Create a new Tax
  router.post("/", taxs.create);

  // Retrieve all Taxs
  router.get("/", taxs.findAll);

  // Retrieve all published Taxs
  router.get("/published", taxs.findAllPublished);

  // Retrieve a single Tax with id
  router.get("/:id", taxs.findOne);

  // Update a Tax with id
  router.put("/:id", taxs.update);

  // Delete a Tax with id
  router.delete("/:id", taxs.delete);

  // Delete all Taxs
  router.delete("/", taxs.deleteAll);

  app.use("/api/taxs", router);
};
