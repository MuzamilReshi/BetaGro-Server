module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Order;
};
