'use strict';

const { hashPassword } = require('../helper/bcrytp');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = [
      {
        email : "bakso@gmail.com",
        password : "bakso",
        role : "admin"
      },      
      {
        email : "bumi@gmail.com",
        password : "bumikotak",
        role : "user"
      },
      {
        email : "siapa@gmail.com",
        password : "siapaya",
        role : "user"
      }
    ]

    user.map((ele) => {
      ele.password = hashPassword(ele.password)
      ele.createdAt = new Date()
      ele.updatedAt = new Date()
      return ele
    })
    await queryInterface.bulkInsert('Users', user, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
