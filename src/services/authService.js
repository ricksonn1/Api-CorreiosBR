const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret.js')

class AuthService {

    async login(dto) {

        const user = await database.users.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
        })
        if (!user) {
            throw new Error('Usuario não cadastrado em nosso sistema!')
        }

        const senhas = await compare(dto.senha, user.senha)
        if (!senhas) {
            throw new Error('Usuario ou senha inválido!')
        }

        const acessToken = sign({
            id: user.id,
            email: user.email
        },
            jsonSecret.secret, {
            expiresIn: 1000000
        })
        return { acessToken }
    }

}

module.exports = AuthService;