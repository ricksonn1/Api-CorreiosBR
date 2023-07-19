const Service = require("./Service");
const database = require('../models')
const { v4: uuidv4 } = require('uuid')

class OrderService extends Service {
    constructor() {
        super('orders')
    }

    async create(dto) {

        const order = await database.orders.findOne({
            where: {
                numero: dto.numero
            }
        })
        if (order) {
            throw new Error('Encomenda já existe no nosso banco de dados!')
        }

        try {
            const user = await database.users.findOne({
                where: {
                    id: dto.userId
                }
            });

            if (!user) {
                throw new Error('Usuário não encontrado!');
            }
            const newOrder = await database.orders.create({
                id: uuidv4(),
                numero: dto.numero,
                status: dto.status,
                userId: user.id
            })
            return newOrder;
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao criar encomenda!')

        }
    }
}
module.exports = OrderService;