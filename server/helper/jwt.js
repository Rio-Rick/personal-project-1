const jwt = require("jsonwebtoken")
const secret = "baksokotak"

const singToken = (payload) => {
    return jwt.sign(payload,secret)
}
const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {singToken, verifyToken}