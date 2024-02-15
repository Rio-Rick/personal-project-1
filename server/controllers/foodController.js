const { Cuisine, User } = require('../models')


class FoodController {
    static async foods(req, res, next) {
        try {
            const list = await Cuisine.findAll()

            res.status(200).json({
                list
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async foodById(req, res, next) {
        try {
            let id = req.params.id
            const food = await Cuisine.findByPk(id)

            res.status(200).json({
                food
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async createFood(req, res, next) {
        try {
            const {name, price, imageUrl} = req.body

            const food = await Cuisine.create({
                name,
                price,
                imageUrl
            })

            res.status(201).json({
                msg : "food succesfully created",
                food
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteFood(req, res, next) {
        try {
            let id = req.params.id
            await Cuisine.destroy({where : { id}})

            res.status(200).json({
                msg : "food succesfully deleted"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async udpateFood(req,res, next) {
        try {
            let id = req.params.id
            const {name, price, imageUrl} = req.body
            
            await Cuisine.update({name, price, imageUrl}, {where : {id}})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FoodController