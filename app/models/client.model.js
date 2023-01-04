module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
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

  return Client;
};
