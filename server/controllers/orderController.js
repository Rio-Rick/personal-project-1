const { Order, Cuisine } = require('../models/index')

class OrderController {
    static async setOrder(req, res, next) {
        try {
            let id = req.params.id
            // console.log(id);
            const { userId } = req.loginInfo

            // console.log(userid);
            const dataOrder = await Order.create({UserId : userId, FoodId : id})
            res.status(201).json({
                msg : "order has been made",
                dataOrder
            })
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = OrderController