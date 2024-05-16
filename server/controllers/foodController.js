const { Cuisine, User } = require('../models')
const {handleUpload} = require('../utils/cloudinary')

class FoodController {
    static async foods(req, res, next) {
        try {
            const{userId} = req.loginInfo
            const list = await Cuisine.findAll()
            const user = await User.findByPk(userId)
            let role = user.role
            res.status(200).json({
                list,
                role
            })
        } catch (error) {
            // res.status(400).json(error.name)
            // console.log(error);
            next(error)
        }
    }

    static async foodById(req, res, next) {
        try {
            let id = req.params.id
            const food = await Cuisine.findByPk(id)
            if(!food) throw { name : "NotFound"}
            res.status(200).json({
                food
            })
        } catch (error) {
            // console.log(error);
            next(error)

        }
    }

    static async createFood(req, res, next) {
        try {
            if(!req.file) {
                throw {name : 'InvalidDataType'}
            }  
                const imageInBase64 = req.file.buffer.toString("base64");
                let dataURI = "data:" + req.file.mimetype + ";base64," + imageInBase64;
                const result= await handleUpload(dataURI)
                // console.log(result);
                // console. log(req.body);
                    const {name, price} = req.body
                // await project.update({ imageUrl : result.url});
                    const food = await Cuisine.create({
                        name,
                        price,
                        imageUrl : result.url
                    })
                res.status(201).json({
                    msg : "food succesfully created",
                    food
                })
        } catch (error) {
            // console.log(error);
            next(error)
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
            next(error)
        }
    }

    static async udpateFood(req,res, next) {
        try {
            let id = req.params.id
            const food = await Cuisine.findByPk(id);
            if(!food) throw { name : "NotFound"}
            // console.log(req.file);
            if(!req.file) {
                throw {name : 'InvalidDataType'}
            }

            if(!food) {
                throw {name : "NotFound"}
            } else {
                const imageInBase64 = req.file.buffer.toString("base64");
                let dataURI = "data:" + req.file.mimetype + ";base64," + imageInBase64;
                const result= await handleUpload(dataURI)

                const {name, price} = req.body
                // if(!name) throw {name : "NotEmpty"}
                // console.log(id);
                await Cuisine.update({name, price, imageUrl : result.url}, {where : {id}})
                res.status(201).json({
                    msg : "food succesfully updated"
                })
            }
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
}

module.exports = FoodController