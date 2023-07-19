const { consultarCep, calcularPrecoPrazo, rastrearEncomendas } = require('correios-brasil')

const OrderService = require('../services/orderService.js')
const orderService = new OrderService()


class CorreiosController {

    static async consultCep(req, res) {

        const { cep } = req.body

        try {
            const consult = await consultarCep(cep)
            res.status(200).json(consult)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async calculatePriceDeadline(req, res) {
        const { sCepOrigem, sCepDestino, nVlPeso, nCdFormato, nVlComprimento, nVlAltura, nVlLargura, nCdServico, nVlDiametro } = req.body

        try {
            let calcPrecoPrazo = await calcularPrecoPrazo({ sCepOrigem, sCepDestino, nVlPeso, nCdFormato, nVlComprimento, nVlAltura, nVlLargura, nCdServico, nVlDiametro })
            res.status(200).json(calcPrecoPrazo)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    static async trackOrders(req, res) {
        const { codigoDeRastreio, userId } = req.body
        try {
            const rastreio = await rastrearEncomendas(codigoDeRastreio)


            const encomenda = {
                numero: rastreio[0].codObjeto,
                status: rastreio[0].eventos[0].descricao,
                userId: userId
            };

            const novaEncomenda = await orderService.create(encomenda)

            res.status(200).json(
                {
                    message: 'Encomenda associada com sucesso!',
                    rastreio
                })

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }


}
module.exports = CorreiosController;