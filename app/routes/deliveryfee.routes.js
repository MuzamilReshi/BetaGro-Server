module.exports = app => {
  const deliveyfees = require("../controllers/deliveyfee.controller.js");

  var router = require("express").Router();

  // Create a new DeliveyFee
  router.post("/", deliveyfees.create);

  // Retrieve all DeliveyFees
  router.get("/", deliveyfees.findAll);

  // Retrieve all published DeliveyFees
  router.get("/published", deliveyfees.findAllPublished);

  // Retrieve a single DeliveyFee with id
  router.get("/:id", deliveyfees.findOne);

  // Update a DeliveyFee with id
  router.put("/:id", deliveyfees.update);

  // Delete a DeliveyFee with id
  router.delete("/:id", deliveyfees.delete);

  // Delete all DeliveyFees
  router.delete("/", deliveyfees.deleteAll);

  app.use("/api/deliveyfees", router);
};
