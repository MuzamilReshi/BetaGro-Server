const db = require("../models");
const Tax = db.taxs;
const Op = db.Sequelize.Op;

// Create and Save a new Tax
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tax
  const tax = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tax in the database
  Tax.create(tax)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tax."
      });
    });
};

// Retrieve all Taxs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tax.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taxs."
      });
    });
};

// Find a single Tax with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tax.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tax with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tax with id=" + id
      });
    });
};

// Update a Tax by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tax.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tax was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tax with id=${id}. Maybe Tax was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tax with id=" + id
      });
    });
};

// Delete a Tax with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tax.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tax was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tax with id=${id}. Maybe Tax was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tax with id=" + id
      });
    });
};

// Delete all Taxs from the database.
exports.deleteAll = (req, res) => {
  Tax.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Taxs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all taxs."
      });
    });
};

// find all published Tax
exports.findAllPublished = (req, res) => {
  Tax.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taxs."
      });
    });
};
