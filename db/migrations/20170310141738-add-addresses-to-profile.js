module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Profiles',
      'addresses',
      {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {}
      }
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn(
      'Profiles',
      'addresses'
    );
  }
};
