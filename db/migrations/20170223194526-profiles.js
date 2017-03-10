module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bossId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [2, 255]
        }
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [2, 255]
        }
      },
      about: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        validate: {
          len: [2, 1000]
        }
      },
      contacts: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      social: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'Roles'
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Profiles');
  }
};
