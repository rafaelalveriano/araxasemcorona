const JwtToken = require('../commons/JwtToken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).send({ error: "not token" })

    const parts = authHeader.split(' ')

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme) || parts.length !== 2)
        return res.status(400).send({ error: "invalid malformed" })

    const tokenDecoded = JwtToken.decodeToken(token)
    if (!tokenDecoded)
        return res.status(401).send({ error: 'token invalid' })

    req.userId = tokenDecoded.id

    return next()
}