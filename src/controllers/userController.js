const UserService = require('../services/userService.js')
const userService = new UserService()

class UserController {

    static async create(req, res) {
        const { nome, email, senha } = req.body

        try {
            const newUser = await userService.create({ nome, email, senha })
            res.status(201).json(newUser)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    static async getUsers(req, res) {

        const users = await userService.getAllUsersAndOrders()
        res.status(200).json(users)
    }
    static async getUserAndOrderById(req, res) {

        const { id } = req.params

        try {
            const userById = await userService.getUserAndOrder(id)
            res.status(200).json(userById)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    static async deleteUser(req, res) {
        const { id } = req.params
        try {
            const verificaUser = await userService.getRecordsById(id)
            if (!verificaUser) {
                res.status(400).send({ message: `Usuario não encontrado!` })
            } else {
                await userService.deleteRecord(id)
                res.status(200).json({ sucess: `Usuario deletado com sucesso!` })
            }
        } catch (error) {
            res.status(200).json({ message: error.message })
        }
    }
    static async updateUser(req, res) {
        const { id } = req.params
        const { newDados } = req.body
        try {
            const newUser = await userService.updateRecord({ id, newDados })
            res.status(200).json(newUser)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}
module.exports = UserController;