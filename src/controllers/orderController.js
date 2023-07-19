const OrderService = require('../services/orderService.js')
const orderService = new OrderService()


class OrderController {

    static async create(req, res) {
        const { numero, status, userId} = req.body

        try {
            const newOrder = await orderService.create({ numero, status, userId})
            res.status(201).json(newOrder)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    static async getOrders(req, res) {
        const order = await orderService.getRecords()
        res.status(200).json(order)
    }
    static async getOrdersById(req, res) {
        const { id } = req.params
        try {
            const orderById = await orderService.getRecordsById(id)
            res.status(200).json(orderById)

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    static async deleteOrder(req, res) {
        const { id } = req.params

        try {
            const verificaOrder = await orderService.getRecordsById(id)
            if (!verificaOrder) {
                res.status(400).json('Encomenda não encontrada em nosso sistema1')
            } else {
                await orderService.deleteRecord(id)
                res.status(200).json('Encomenda deletada com sucesso!')
            }
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    static async updateOrder(req, res) {
        const { id } = req.params
        const { newDados } = req.body

        try {
            const verificaOrder = await orderService.getRecordsById(id)
            const orderUpdate = await orderService.updateRecord({ newDados, id })
            if (!verificaOrder) {
                res.status(400).json('Encomenda não encontrada em nosso sistema1')
            } else {
                res.status(200).json(orderUpdate)
            }
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}
module.exports = OrderController