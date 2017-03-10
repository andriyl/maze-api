module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Profiles', [{
      id: 1,
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      handle: 'markelog',
      about: 'Killa gorilla',
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt: new Date(),
      birthday: new Date('2017-03-08'),
    }, {
      id: 2,
      bossId: 1,
      name: 'Andrés C. Viesca Ruiz',
      title: 'Taco developer',
      about: 'Sexy turtle',
      handle: 'Viestat',
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt: new Date(),
      addresses: {
        home: {
          country: 'USA',
          state: 'Texas',
          city: 'Paris'
        },
        current: {
          country: 'The Netherlands',
          province: 'Gelderland',
          city: 'Bronkhorst'
        }
      },
      birthday: new Date('1992-05-28'),
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Profiles', {
      id: { $in: [1, 2] }
    });
  }
};
