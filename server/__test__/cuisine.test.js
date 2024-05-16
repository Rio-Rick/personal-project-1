const request = require('supertest') // seperti axios
const app = require('../app')
const {singToken , verifyToken} = require('../helper/jwt')
const { sequelize } = require('../models/index.js')
const { hashPassword } = require("../helper/bcrytp.js")
const path = require('path')
const fs = require("fs")
const axios = require('axios')

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

  console.log(user,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....");
  await sequelize.queryInterface.bulkInsert('Users', user, {})
  // console.log(item);
  let admin = {
    email : "siapa@gmail.com",
    password : "siapaya",
    role : "admin"
  }
   console.log(admin.email, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
  const payload = {
    id : 1,
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

describe('GET /foods', () => {
  describe('GET /foods - succeed', () => {
    test('Should be return an object instance of  list and role', async() => {
    //   const body = {
    //     name : "bakso",
    //     description : "bakso komplit sangat", 
    //     price : 10000,
    //     imgUrl : "tesssssssssssst",
    //     categoryId : "1",
    //     authorId : "1"
    //   }
      
      // const response = await request(app).post('/cuisine').set('Authorization', `Bearer ${access_token_admin}`).send(body)
      const response = await request(app).get('/foods').set('authorization', `Bearer ${access_token}`)
      // console.log(response.body);
      // console.log(response);
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('list', expect.any(Object))
      expect(response.body).toHaveProperty('role', expect.any(String))
    })
  })

 

describe('GET /foods', () => {
//   describe('GET /foods - succed', () => {
//     test('Should be return an instane of Object of data foods', async() => {
//       const response = await request(app).get('/foods').set('Authorization', `Bearer ${access_token}`)

//       expect(response.status).toBe(200)
//       expect(response.body).toBeInstanceOf(Object)
//       expect(response.body).toHaveProperty('list', expect.any(Object))
//       expect(response.body).toHaveProperty('role', expect.any(Object))
//     })
//   })

  describe('GET /foods - failed', () => {
    test('Should be return an error message', async() => {
      const response = await request(app).get('/foods')

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })

    test('Should be return an error message', async() => {
      const response = await request(app).get('/foods').set('Authorization', `Bearer bakso`)

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })
  })
})

describe('GET /foods/:id', () => {
  describe('GET /foods/:id - succed', () => {
    test('Should be return an instane of Object of data foods', async() => {
      const response = await request(app).get('/foods/2').set('Authorization', `Bearer ${access_token}`)
      // console.log(response);
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('food', expect.any(Object))
    })
  })

  describe('GET /foods/:id - failed', () => {


    test('Should be return an error message', async() => {
      const response = await request(app).get('/foods/1').set('Authorization', `Bearer bakso`)

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })

    test('Should be return an error message', async() => {
      const response = await request(app).get('/foods/-1').set('Authorization', `Bearer ${access_token}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message','Not Found')
    })
  })
})

// describe('PUT /foods/:id', () => {
//   describe('PUT /foods/:id - succed', () => {
//     test('Should be return an instane of Object of update data foods', async() => {
//       const res = await request(app).put('/foods/3').set('Authorization', `Bearer ${access_token}`)

//       const body = {
//         name : "bakso",
//         price : 10000,
//         imgUrl : res
//       }
//       const response = await request(app).put('/foods/3').set('Authorization', `Bearer ${access_token}`).send(body).attach("file", imgBuffer, "pakcekkobo.png")
//       // console.log(response);
//       expect(response.status).toBe(200)
//       expect(response.body).toBeInstanceOf(Object)
//       expect(response.body).toHaveProperty('foods', expect.any(Object))
//     })
//   })

  describe('PUT /foods/:id - failed', () => {
    test('Should be return an error message', async() => {
      const body = {
        name : "bakso",
        price : 10000,
        imgUrl : "tesssssssssssst"
      }
      const response = await request(app).put('/foods/3').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })

    test('Should be return an error message', async() => {
      const body = {
        name : "bakso",
        price : 10000,
        imgUrl : "tesssssssssssst"
      }
      const response = await request(app).put('/foods/3').set('Authorization', `Bearer bakso`).send(body)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })

    test('Should be return an error message', async() => {
      const body = {
        name : "bakso",
        price : 10000,
        imgUrl : "tesssssssssssst"
      }
      const response = await request(app).put('/foods/-1').set('Authorization', `Bearer ${access_token}`).send(body)
      // console.log(response);
      expect(response.status).toBe(403)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message',expect.any(String))
    })

    test('Should be return an error message', async() => {
      const body = {
        name : "bakso",
        price : 10000,
        imgUrl : "tesssssssssssst"
      }
      const response = await request(app).put('/foods/1').set('Authorization', `Bearer ${access_token}`).send(body)

      expect(response.status).toBe(403)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Forbidden')
    })

    test('Should be return an error message', async() => {
      const body = {
        name : "",
        price : 10000,
        imgUrl : "tesssssssssssst"
      }
      const response = await request(app).put('/foods/3').set('Authorization', `Bearer ${access_token}`).send(body)

      expect(response.status).toBe(403)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message',expect.any(String))
    })

    test('Should be return an error message', async() => {
      const body = {
        name : "bakso",
        price : true,
        imgUrl : "tes"
      }
      const response = await request(app).put('/foods/3').set('Authorization', `Bearer ${access_token}`).send(body)
      // console.log(response);
      expect(response.status).toBe(403)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Forbidden')
    })
  })
})

describe('DELETE /foods/:id', () => {
  describe('DELETE /foods/:id - succed', () => {
    test('Should be return an instane of Object of data foods', async() => {
      const response = await request(app).delete('/foods/10').set('Authorization', `Bearer ${access_token}`)
      // console.log(response);
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('msg', 'food succesfully deleted')
    })
  })

  describe('DELETE /foods/:id - failed', () => {
    test('Should be return an error message', async() => {
      const response = await request(app).delete('/foods/1')

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })

    test('Should be return an error message', async() => {
      const response = await request(app).delete('/foods/1').set('Authorization', `Bearer bakso`)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Unauthorized')
    })

    test('Should be return an error message', async() => {
      const response = await request(app).delete('/foods/-1').set('Authorization', `Bearer ${access_token}`)
      // console.log(response);
      expect(response.status).toBe(403)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Forbidden')
    })

    test('Should be return an error message', async() => {
      const response = await request(app).delete('/foods/1').set('Authorization', `Bearer ${access_token}`)

      expect(response.status).toBe(403)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message','Forbidden')
    })

  })
})

