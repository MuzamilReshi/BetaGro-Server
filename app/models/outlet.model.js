module.exports = (sequelize, Sequelize) => {
  const Outlet = sequelize.define("outlet", {
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

  return Outlet;
};
