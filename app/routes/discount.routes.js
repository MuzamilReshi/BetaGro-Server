module.exports = app => {
  const discounts = require("../controllers/discount.controller.js");

  var router = require("express").Router();

  // Create a new Discount
  router.post("/", discounts.create);

  // Retrieve all Discounts
  router.get("/", discounts.findAll);

  // Retrieve all published Discounts
  router.get("/published", discounts.findAllPublished);

  // Retrieve a single Discount with id
  router.get("/:id", discounts.findOne);

  // Update a Discount with id
  router.put("/:id", discounts.update);

  // Delete a Discount with id
  router.delete("/:id", discounts.delete);

  // Delete all Discounts
  router.delete("/", discounts.deleteAll);

  app.use("/api/discounts", router);
};
