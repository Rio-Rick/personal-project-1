const { comparePassword } = require('../helper/bcrytp');
const { singToken } = require('../helper/jwt');
const{ User } = require('../models')
const { OAuth2Client } = require('google-auth-library');
// const { createToken } = require('../helper/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            // console.log('masuk register');
            const { email, password } = req.body

            const user = await User.create({email, password})

            res.status(201).json({
                id: user.id,
                email : user.email
            })
        } catch (error) {
            // console.log(error);
            next(error)

        }
    }

    static async login(req, res, next) {
        try {
            console.log("ini jalan, <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
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
            console.log("bako");
            next(error)

        }
    }
 
    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: `917780056581-drc9i137r8lllt9kduia5n31nufpgdrl.apps.googleusercontent.com`,
            });

            const payload = ticket.getPayload();
            // console.log(payload);
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    email: payload.email,
                    password: "password_google",
                    role : 'user'
                },
                hooks: false
            })
            // console.log(user);

            const access_token = singToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            res.status(200).json( {access_token} )
        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
    // static async findRole(req,res,next) {
    //     try {
    //         const user = await User.findByPk(userId)
    //         let role = user.role
    //         res.status(200).json({
    //             role
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

module.exports = UserController