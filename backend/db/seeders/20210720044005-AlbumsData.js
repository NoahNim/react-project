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
      name: 'Test Album', userId: 1, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Test Album 2', userId: 1, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Test Album 3', userId: 2, createdAt: new Date(), updatedAt: new Date()
    }], {});
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
