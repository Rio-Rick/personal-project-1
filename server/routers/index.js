const FoodController = require('../controllers/foodController')
const OrderController = require('../controllers/orderController')
const UserController = require('../controllers/userController')
const upload = require('../utils/multer')
const middlewareUpload = upload.single("file");
const { authentication, authorization } = require('../middlewares/auth');
const PaymentController = require('../controllers/paymentController');

// const cors = require('cors')

const router = require('express').Router()
// app.use(cors({
//     origin : "*"
// }))
//user
router.post('/login', UserController.login)
router.post('/registers', UserController.register)
router.post('/google-login', UserController.googleLogin)

router.use(authentication)
// router.get('/role', UserController.findRole)
//food
router.get('/foods', FoodController.foods)
router.get('/foods/:id', FoodController.foodById)
router.put('/foods/:id', authorization, middlewareUpload, FoodController.udpateFood)
router.delete('/foods/:id',authorization, FoodController.deleteFood)
router.post('/foods',authorization, middlewareUpload, FoodController.createFood)

// //public
// router.get('/pub/foods', FoodController.foods)
// router.get('/pub/foods/:id', FoodController.foodById)

//order
router.post('/order/:id', OrderController.setOrder)
router.get('/orders', OrderController.findOrder)

router.get('/payment/midtrans/initiate/:id', PaymentController.initiateMidtrans )
router.delete('/payment/midtrans/cancel/:id', OrderController.cancelOrder)

module.exports = router

