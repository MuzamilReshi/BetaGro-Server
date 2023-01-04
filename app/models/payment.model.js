module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
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

  return Payment;
};
