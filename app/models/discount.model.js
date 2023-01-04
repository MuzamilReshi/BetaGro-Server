module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define("discount", {
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

  return Discount;
};
