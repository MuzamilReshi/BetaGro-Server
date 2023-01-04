module.exports = (sequelize, Sequelize) => {
  const Tax = sequelize.define("tax", {
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

  return Tax;
};
