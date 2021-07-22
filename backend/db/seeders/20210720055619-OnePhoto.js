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
      name: 'Miqo\'/te uWu', imgUrl: 'https://images-for-project-noah-ultima.s3.us-west-2.amazonaws.com/miqo.jpeg', userId: 1, albumId: 2, createdAt: new Date(), updatedAt: new Date()
    }, {
      name: 'Pizza', imgUrl: 'https://images-for-project-noah-ultima.s3.us-west-2.amazonaws.com/pie.jpg', userId: 3, albumId: 5, createdAt: new Date(), updatedAt: new Date()
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