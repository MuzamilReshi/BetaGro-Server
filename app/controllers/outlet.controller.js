const db = require("../models");
const Outlet = db.outlets;
const Op = db.Sequelize.Op;

// Create and Save a new Outlet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Outlet
  const outlet = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Outlet in the database
  Outlet.create(outlet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Outlet."
      });
    });
};

// Retrieve all Outlets from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Outlet.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving outlets."
      });
    });
};

// Find a single Outlet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Outlet.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Outlet with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Outlet with id=" + id
      });
    });
};

// Update a Outlet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Outlet.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Outlet was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Outlet with id=${id}. Maybe Outlet was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Outlet with id=" + id
      });
    });
};

// Delete a Outlet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Outlet.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Outlet was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Outlet with id=${id}. Maybe Outlet was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Outlet with id=" + id
      });
    });
};

// Delete all Outlets from the database.
exports.deleteAll = (req, res) => {
  Outlet.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Outlets were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all outlets."
      });
    });
};

// find all published Outlet
exports.findAllPublished = (req, res) => {
  Outlet.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving outlets."
      });
    });
};
