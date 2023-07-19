const database = require('../models')
const { hash } = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const Service = require('./Service')

class UserService extends Service {
    constructor() {
        super('users')
    }
    async create(dto) {

        const user = await database.users.findOne({
            where: {
                nome: dto.nome
            }
        })
        if (user) {
            throw new Error('Usuario não cadastrado em nosso sistema!')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)

            const newUser = await database.users.create({
                id: uuidv4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
            return newUser;
        } catch (error) {
            throw new Error('Erro ao criar novo usuario!')
        }
    }

    async getAllUsersAndOrders() {
        const user = await database.users.findAll({

            include: [{
                model: database.orders,
                as: 'orders',
                atributtes: ['id', 'numero', 'status']
            }]
        })
        return user
    }


    async getUserAndOrder(id) {
        const user = await database.users.findOne({
            where: { id: id },
            include: [{

                model: database.orders,
                as: 'orders',
                atributtes: ['id', 'numero', 'status']

            }]
        })
        return user;
    }

}

module.exports = UserService;