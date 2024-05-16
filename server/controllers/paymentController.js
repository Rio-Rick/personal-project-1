const midtransClient = require('midtrans-client');
const {Cuisine, User, Order} = require('../models/index')
const SERVER_KEY_MIDTRANS = process.env.SERVER_KEY_MIDTRANS

class PaymentController {
    static async initiateMidtrans(req, res, next) {
        try {
            let id = req.params.id
            const { userId }= req.loginInfo
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : SERVER_KEY_MIDTRANS
            });
            const orderId = Math.random().toString();
            console.log(orderId);
            let food = await Cuisine.findByPk(id)
            if(!food) throw { name : "NotFound"} 
            // console.log(food.price);
            let user = await User.findByPk(userId)
            if(!user) throw { name : "NotFound"} 

            // console.log(user);
            const amount = food.price
        let parameter = {
            "transaction_details": {
                "order_id": orderId,
                "gross_amount": amount
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "email": req.loginInfo.email,
            }
        };
        const transaction = await snap.createTransaction(parameter)
                // transaction token
        let transactionToken = transaction.token;

        // console.log('transactionToken:',transactionToken);
        let order = await Order.create({
            UserId : user.id,
            FoodId : food.id
        })
        res.json({message : 'order created', transactionToken, order})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController