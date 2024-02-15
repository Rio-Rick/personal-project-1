const { verifyToken } = require("../helper/jwt");
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if(!authorization) {
            throw { name : "Unauthorized"}
        }

        const token = authorization.split(" ")[1]

        const payload = verifyToken(token)
        const user = await User.findByPk(payload.id)

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
    }
}

const authorization = async(req,res,next) => {
    try {
        const { role } = req.loginInfo

        if(role == "user") throw { name : "forbidden"}

        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {authentication, authorization}