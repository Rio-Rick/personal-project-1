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


  const payment = [
    {
        id : 1,
        UserId : 2,
        FoodId : 5
    },
    {
        id : 2,
        UserId : 2,
        FoodId : 5
    },
    {
        id : 3,
        UserId : 1,
        FoodId : 15
    },
    {
        id : 4,
        UserId : 1,
        FoodId : 5
    }
  ]


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
  await sequelize.queryInterface.bulkInsert('Cuisines', data, {})
  await sequelize.queryInterface.bulkInsert('Users', user, {})
  await sequelize.queryInterface.bulkInsert('Orders', payment, {})
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
    await sequelize.queryInterface.bulkDelete('Orders', null, {
        truncate : true, cascade : true, restartIdentity : true
    })
})


describe('GET /payment/midtrans/initiate/:id', () => {
    describe('GET /payment/midtrans/initiate/:id - succed', () => {
        test('Should return an object of dataOrder and msg', async () => {
            const response = await request(app).post('/payment/midtrans/initiate/1').set('Authorization', `Bearer ${access_token_admin}`)
            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('dataOrder', expect.any(Object))
            expect(response.body).toHaveProperty('msg', "order has been made")
        })
    })

    describe('GET /payment/midtrans/initiate/2 - failed', () => {
        test('Should be return an error message', async() => {
          const response = await request(app).get('/payment/midtrans/initiate/2')
    
          expect(response.status).toBe(404)
          expect(response.body).toHaveProperty('message','Not Found')
        })
    
        test('Should be return an error message', async() => {
          const response = await request(app).get('/payment/midtrans/initiate/3').set('Authorization', `Bearer bakso`)
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
        test('Should be return an error message', async() => {
          const response = await request(app).get('/payment/midtrans/initiate/2')
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
    })
})