module.exports = (sequelize, Sequelize) => {
  const DeliveryFee = sequelize.define("deliveryfee", {
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

  return DeliveryFee;
};
