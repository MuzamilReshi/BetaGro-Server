const db = require("../models");
const Adjustment = db.adjustments;
const Op = db.Sequelize.Op;

// Create and Save a new Adjustment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Adjustment
  const adjustment = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save adjustment in the database
  Adjustment.create(adjustment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Adjustment."
      });
    });
};

// Retrieve all Adjustments from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Adjustment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adjustments."
      });
    });
};

// Find a single Adjustment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Adjustment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Adjustment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Adjustment with id=" + id
      });
    });
};

// Update a Adjustment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Adjustment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Adjustment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Adjustment with id=${id}. Maybe Adjustment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Adjustment with id=" + id
      });
    });
};

// Delete a Adjustment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Adjustment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Adjustment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Adjustment with id=${id}. Maybe Adjustment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Adjustment with id=" + id
      });
    });
};

// Delete all Adjustments from the database.
exports.deleteAll = (req, res) => {
  Adjustment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Adjustments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all adjustments."
      });
    });
};

// find all published Adjustment
exports.findAllPublished = (req, res) => {
  Adjustment.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adjustments."
      });
    });
};
