const express = require('express')
const port = 3000;
const routes = require('./routes')

const app = express()

routes(app)

app.listen(port, () => {
    console.log(`Servidor escutando em  http://localhost:${port}`)
})

module.exports = app;