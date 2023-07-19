const AuthService = require('../services/authService.js')
const authService = new AuthService()


class AuthController {

    static async login(req, res) {

        const { email, senha } = req.body

        try {
            const auth = await authService.login({ email, senha })
            res.status(200).json(auth)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }

}
module.exports = AuthController