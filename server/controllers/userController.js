const { comparePassword } = require('../helper/bcrytp');
const { singToken } = require('../helper/jwt');
const{ User } = require('../models')

class UserController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await User.create({email, password})

            res.status(201).json({
                id: user.id,
                email : user.email
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            console.log(email, password);
            if(!email) throw { name : "EmailLoginError"}
            if(!password) throw {name : "PasswordLoginError"}

            const user = await User.findOne({
                where : {
                    email
                }
            })
            // console.log(user);
            if(!user) throw { name : "LoginError"}
            if(!comparePassword(password, user.password)) {
                throw { name : "LoginError"}
            }

            const payload = {
                id : user.id,
                email : user.email
            }

            const access_token = singToken(payload)

            res.status(200).json({
                access_token
            })

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController