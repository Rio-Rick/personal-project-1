'use strict';
const axios = require('axios')
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

  
  
    async function findData(name) {
      try {
        const options = {
          method: 'GET',
          url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
          params: {
            'ingr' : `${name}`,
            'nutrition-type': 'logging',
            'category[0]': 'generic-meals',
          },
          headers: {
            'X-RapidAPI-Key': 'e7e78573a8mshe1637ec66675b3dp12e64djsn69a6de85d839',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
          }
        };
          const response = await axios.request(options);
          let newData = response.data.hints.map(ele => {
              let data = {}
  
            if(ele.food.image) {
                data = ({
                  name : ele.food.label,
                  imageUrl : ele.food.image,
                  price : Math.floor(Math.random() * 100000) + 1000,
                  createdAt : new Date(),
                  updatedAt : new Date()
                  
                  })
            }
              return data
          })
          function isEmptyObject(obj) {
              return Object.keys(obj).length === 0 && obj.constructor === Object;
          }
          let newArr = newData.filter(obj => !isEmptyObject(obj));

          return newArr
      } catch (error) {
          console.error(error);
      }
    }

    let names = ['hamburger','steak','fried','pasta', 'ramen' ,'pizza','cheese']
    for(let item of names) {
      const data = await findData(item)
      await queryInterface.bulkInsert('Cuisines', data, {})
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cuisines', null, {});

  }
};
