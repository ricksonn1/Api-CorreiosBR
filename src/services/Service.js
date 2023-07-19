const database = require('../models')

class Service {
    constructor(modelo) {
        this.modelo = modelo
    }

    async create(dados) {
        return database[this.modelo].create(dados)
    }
    async getRecords() {
        return database[this.modelo].findAll()
    }
    async getRecordsById(id) {
        return database[this.modelo].findOne({ where: { id: id } })
    }
    async deleteRecord(id) {
        return database[this.modelo].destroy({ where: { id: id } })
    }
    async updateRecord(newDados, id) {
        return database[this.modelo].update({ newDados, id })
    }
}
module.exports = Service;