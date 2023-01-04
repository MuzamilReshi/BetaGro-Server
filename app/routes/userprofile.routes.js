module.exports = app => {
  const userprofiles = require("../controllers/userprofile.controller.js");

  var router = require("express").Router();

  // Create a new UserProfile
  router.post("/", userprofiles.create);

  // Retrieve all UserProfiles
  router.get("/", userprofiles.findAll);

  // Retrieve all published UserProfiles
  router.get("/published", userprofiles.findAllPublished);

  // Retrieve a single UserProfile with id
  router.get("/:id", userprofiles.findOne);

  // Update a UserProfile with id
  router.put("/:id", userprofiles.update);

  // Delete a UserProfile with id
  router.delete("/:id", userprofiles.delete);

  // Delete all UserProfiles
  router.delete("/", userprofiles.deleteAll);

  app.use("/api/userprofiles", router);
};
