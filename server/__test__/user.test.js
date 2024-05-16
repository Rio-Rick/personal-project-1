const request = require('supertest') // seperti axios
const app = require('../app')
const {singToken , verifyToken} = require('../helper/jwt')
const { sequelize } = require('../models')
const { hashPassword } = require('../helper/bcrytp')
const path = require('path')
const fs = require("fs")
const filePath = path.resolve(__dirname,"../image/pakcekkobo.jpg")
const imgBuffer = fs.readFileSync(filePath)
const axios = require('axios')


let access_token_admin;
let access_token;

// function addCreatedUpdated(arr){
//     return arr.map((el)=>{
//       el.createdAt = new Date()
//       el.updatedAt = new Date()
//       return el
//     })
// }

beforeAll(async() => {
  const data = require('../data/edamam.json').map((ele) => {
    delete ele.id
    return ele
  })

  await sequelize.queryInterface.bulkInsert('Cuisines', data, {})



  const user = [
    {
      email : "bumi@gmail.com",
      password : "bumikotak",
      role : "user"
    },
    {
      email : "siapa@gmail.com",
      password : "siapaya",
      role : "admin"
    }
  ]

  user.map((ele) => {
    ele.password = hashPassword(ele.password)
    ele.createdAt = new Date()
    ele.updatedAt = new Date()
    return ele
  })

  // console.log(user,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....");
  await sequelize.queryInterface.bulkInsert('Users', user, {})
  // console.log(item);
  // let admin = {
  //   email : "siapa@gmail.com",
  //   password : "siapaya",
  //   role : "admin"
  // }
  //  console.log(admin.email, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
  const payload = {
    id : 2,
    email : "siapa@gmail.com"
  }
  access_token = singToken(payload)
})

afterAll(async() => {
    await sequelize.queryInterface.bulkDelete('Cuisines', null, {
        truncate : true, cascade : true, restartIdentity : true
    })
    await sequelize.queryInterface.bulkDelete('Users', null, {
        truncate : true, cascade : true, restartIdentity : true
    })
})
