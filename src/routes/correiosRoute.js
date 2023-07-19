const { Router } = require('express')
const CorreiosController = require('../controllers/correiosController.js')

const router = Router()

router
    .post('/consultacep', CorreiosController.consultCep)
    .post('/calcprecoprazo', CorreiosController.calculatePriceDeadline)
    .post('/rastrearencomenda/', CorreiosController.trackOrders)

module.exports = router;