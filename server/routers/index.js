const FoodController = require('../controllers/foodController')
const OrderController = require('../controllers/orderController')
const UserController = require('../controllers/userController')
const { authentication, authorization } = require('../middlewares/auth')


const router = require('express').Router()

//user
router.post('/login', UserController.login)
router.post('/registers', UserController.register)

router.use(authentication)
//food
router.get('/foods', FoodController.foods)
router.get('/foods/:id', FoodController.foodById)
router.put('/foods/:id', authorization, FoodController.udpateFood)
router.delete('/foods/:id', authorization, FoodController.deleteFood)
router.post('/foods',authorization, FoodController.createFood)

// //public
// router.get('/pub/foods', FoodController.foods)
// router.get('/pub/foods/:id', FoodController.foodById)

//order
router.post('/order/:id', OrderController.setOrder)


module.exports = router

