const { verify, decode } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret.js')

module.exports = async (req, res, next) => {


    const token = req.headers.authorization
    if (!token) {
        res.status(400).json({ message: 'Acess token não informado, sem autorização para entrar!' })
    }

    const [, acessToken] = token.split(" ")


    try {
        verify(acessToken, jsonSecret.secret)

        const { id, email } = await decode(acessToken)

        req.usuarioId = id
        req.usuarioEmail = email
        return next()

    } catch (error) {
        res.status(400).json({ message: 'Usuario não permitido no sistema!' })
    }
}