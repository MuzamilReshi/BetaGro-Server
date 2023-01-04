module.exports = (sequelize, Sequelize) => {
  const UserProfile = sequelize.define("userprofile", {
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

  return UserProfile;
};
