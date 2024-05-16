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


describe('GET /orders', () => {
    describe('GET /orders - succed', () => {
        test('Should return an object of dataOrder and msg', async () => {
            const response = await request(app).post('/orders').set('Authorization', `Bearer ${access_token_admin}`)
            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('dataOrder', expect.any(Object))
            expect(response.body).toHaveProperty('msg', "order has been made")
        })
    })

    describe('GET /orders - failed', () => {
        test('Should be return an error message', async() => {
          const response = await request(app).get('/orders')
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
    
        test('Should be return an error message', async() => {
          const response = await request(app).get('/orders').set('Authorization', `Bearer bakso`)
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
        test('Should be return an error message', async() => {
          const response = await request(app).get('/orders')
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
    })
})
describe('delete /payment/midtrans/cancel/:id', () => {
    describe('delete /payment/midtrans/cancel/:id - succed', () => {
        test('Should return an object of dataOrder and msg', async () => {
            const response = await request(app).post('/payment/midtrans/cancel/:id').set('Authorization', `Bearer ${access_token_admin}`)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('msg', "order cancel")
        })
    })
    describe('delete /payment/midtrans/cancel/:id/:id - failed', () => {
        test('Should be return an error message', async() => {
          const response = await request(app).delete('/payment/midtrans/cancel/-1')
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
    
        test('Should be return an error message', async() => {
          const response = await request(app).delete('/payment/midtrans/cancel/3').set('Authorization', `Bearer bakso`)
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
        test('Should be return an error message', async() => {
          const response = await request(app).delete('/payment/midtrans/cancel/4')
    
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message','Unauthorized')
        })
    })
})