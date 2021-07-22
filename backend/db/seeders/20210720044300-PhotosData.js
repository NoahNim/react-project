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
    return queryInterface.bulkInsert('Photos', [{
      name: 'Test Photo', imgUrl: 'https://images-for-project-noah-ultima.s3.us-west-2.amazonaws.com/hades.png' , userId: 1, albumId: 1, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Test Photo 2', imgUrl: 'https://images-for-project-noah-ultima.s3.us-west-2.amazonaws.com/hyda.jpg' ,userId: 1, albumId: 1, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Test Photo 3', imgUrl: 'https://images-for-project-noah-ultima.s3.us-west-2.amazonaws.com/midgard.png', userId: 2, albumId: 3, createdAt: new Date(), updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Photos', null, {});
  }
};