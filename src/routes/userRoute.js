const Router = require('express')
const UserController = require('../controllers/userController.js')
const autenticacao = require('../middleware/autenticacao.js')

const router = Router()

router.use(autenticacao)

router
    .post('/users', UserController.create)
    .get('/users', UserController.getUsers)
    .get('/users/:id', UserController.getUserAndOrderById)
    .delete('/users/:id', UserController.deleteUser)
    .put('/users/:id', UserController.updateUser)

module.exports = router;