const { verifyToken } = require("../helper/jwt");
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if(!authorization) {
            throw { name : "Unauthorized"}
        }
        // console.log(authorization);
        const token = authorization.split(" ")[1]
        // console.log(token);
        const payload = verifyToken(token)
        const user = await User.findByPk(payload.id)
        // console.log(user);
        if(!user) {
            throw { name : "Unauthorized"}
        }

        req.loginInfo = {
            userId : user.id,
            email : user.email,
            role : user.role
        }

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const authorization = async(req,res,next) => {
    try {
        const { role } = req.loginInfo

        if(role == "user") throw { name : "Forbidden"}

        next()
    } catch (error) {
        // console.log(error);
        next(error)
    }
}

module.exports = {authentication, authorization}