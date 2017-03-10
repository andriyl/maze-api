module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Profiles',
      'joinedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn(
      'Profiles',
      'joinedAt'
    );
  }
};
