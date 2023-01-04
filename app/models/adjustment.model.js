module.exports = (sequelize, Sequelize) => {
  const Adjustment = sequelize.define("adjustment", {
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

  return Adjustment;
};
