const db = require("../models");
const Discount = db.discounts;
const Op = db.Sequelize.Op;

// Create and Save a new Discount
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Discount
  const discount = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Discount in the database
  Discount.create(discount)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Discount."
      });
    });
};

// Retrieve all Discounts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Discount.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving discounts."
      });
    });
};

// Find a single Discount with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Discount.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Discount with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Discount with id=" + id
      });
    });
};

// Update a Discount by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Discount.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Discount was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Discount with id=${id}. Maybe Discount was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Discount with id=" + id
      });
    });
};

// Delete a Discount with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Discount.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Discount was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Discount with id=${id}. Maybe Discount was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Discount with id=" + id
      });
    });
};

// Delete all Discounts from the database.
exports.deleteAll = (req, res) => {
  Discount.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Discounts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all discounts."
      });
    });
};

// find all published Discount
exports.findAllPublished = (req, res) => {
  Discount.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving discounts."
      });
    });
};
