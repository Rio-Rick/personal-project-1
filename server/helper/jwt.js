const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET_KEY

const singToken = (payload) => {
    return jwt.sign(payload,SECRET)
}
const verifyToken = (token) => {
    return jwt.verify(token, SECRET)
}

module.exports = {singToken, verifyToken}