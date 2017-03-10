module.exports = (storage, Sequelize) => {
  const Profiles = storage.define('Profiles', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [2, 255]
      }
    },
    handle: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
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
      allowNull: true,
      defaultValue: {}
    },
    addresses: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    joinedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    social: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
  }, {
    classMethods: {
      associate(models) {
        models.Profiles.belongsTo(models.Profiles, {
          foreignKey: 'bossId',
          as: 'boss'
        });

        models.Profiles.hasMany(models.Profiles, {
          foreignKey: 'id',
          as: 'subordinates'
        });
      }
    },
    timestamps: true,
    paranoid: true,
    tableName: 'Profiles'
  });

  return Profiles;
};
