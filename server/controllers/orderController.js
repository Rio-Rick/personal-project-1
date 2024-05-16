const { Order, Cuisine } = require('../models/index')
const { Op } = require("sequelize");
class OrderController {
    static async setOrder(req, res, next) {
        try {
            let id = req.params.id
            // console.log(id);
            const { userId, role } = req.loginInfo
            const food = await Cuisine.findOne({where : {id}})
            // console.log(userid);
            if(!food) {
                throw {name : "NotFound"}
            }
            const dataOrder = await Order.create({UserId : userId, FoodId : id})
            res.status(201).json({
                msg : "order has been made",
                dataOrder
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async findOrder(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const orders = await Order.findAll({where : { UserId : userId}})
            const userOrder = []
            // const newUserOrder = []
            // console.log(orders[0], "<<<<<<<<<<<<<<<<<<<<");
            for(let i = 0; i < orders.length; i++) {
                let newUser = {}
                // console.log(i);
                let data = await Cuisine.findByPk(orders[i].FoodId)
                // console.log(data.id);
                // for(let i =0; i< data.length; i++) {
                //     data.id
                //     console.log(data.id);
                // // }
                // data.map((ele,idx) => {
                //     ele.id = idx
                //     return ele
                // })
                // console.log(data.id);
                // userOrder.push(data)
                newUser = {
                    id : i,
                    name : data.name,
                    price : data.price,
                    imageUrl : data.imageUrl,
                    createdAt : orders[i].createdAt
                }

                userOrder.push(newUser)
            }
            // time.push(orders)
            res.status(200).json({
                msg : "my order",
                userOrder
            })
        } catch (error) {
            // console.log(error);
            next(error)

        }
    }

    static async cancelOrder(req, res, next) {
        try {
            let id = req.params.id
            const {userId} = req.loginInfo
            let data = await Order.destroy({
                where : {[Op.and]: [
                { id: id },
                { UserId: userId }
              ]}})

            if(!data) throw {name : "NotFound"}
            res.status(201).json({
                msg: "cancel"
            })
        } catch (error) {
            next(error)
        }
    }
} 


module.exports = OrderController