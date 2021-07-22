'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Albums', [{
      name: 'Fantasy', userId: 1, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Kittens', userId: 1, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Random', userId: 2, createdAt: new Date(), updatedAt: new Date()
      }, {
        name: 'Random', userId: 1, createdAt: new Date(), updatedAt: new Date()
      }, {
        name: 'Pizza Album', userId: 3, createdAt: new Date(), updatedAt: new Date()
      }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
