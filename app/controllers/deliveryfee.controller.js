const db = require("../models");
const DeliveryFee = db.deliveryfees;
const Op = db.Sequelize.Op;

// Create and Save a new DeliveryFee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a DeliveryFee
  const deliveryfee = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save DeliveryFee in the database
  DeliveryFee.create(deliveryfee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DeliveryFee."
      });
    });
};

// Retrieve all DeliveryFees from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  DeliveryFee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deliveryfees."
      });
    });
};

// Find a single DeliveryFee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DeliveryFee.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find DeliveryFee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving DeliveryFee with id=" + id
      });
    });
};

// Update a DeliveryFee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DeliveryFee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DeliveryFee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update DeliveryFee with id=${id}. Maybe DeliveryFee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating DeliveryFee with id=" + id
      });
    });
};

// Delete a DeliveryFee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DeliveryFee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DeliveryFee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete DeliveryFee with id=${id}. Maybe DeliveryFee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete DeliveryFee with id=" + id
      });
    });
};

// Delete all DeliveryFees from the database.
exports.deleteAll = (req, res) => {
  DeliveryFee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} DeliveryFees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all deliveryfees."
      });
    });
};

// find all published DeliveryFee
exports.findAllPublished = (req, res) => {
  DeliveryFee.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deliveryfees."
      });
    });
};
