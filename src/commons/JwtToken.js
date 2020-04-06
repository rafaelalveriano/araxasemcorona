const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret')

const signToken = params =>
    jwt.sign(params, secret, {
        expiresIn: 96400
    })

const decodeToken = token =>
    jwt.verify(token, secret, (err, decoded) => err ? false : decoded)

module.exports = {
    signToken,
    decodeToken
}    