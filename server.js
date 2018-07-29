const express = require('express')
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

let port = process.env.port || 8000
let router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Beleza! Bem vindo a nossa loja XYZ.', })
})

app.use('/api', router)

app.listen(port)

console.log('Iniciando a app na porta ' + port)