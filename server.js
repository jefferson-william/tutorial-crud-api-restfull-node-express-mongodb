const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const mongoUri = 'mongodb://node-crud-api:J18302222@ds143900.mlab.com:43900/node-crud-api'

const client = mongoose.connect(mongoUri, {
    useNewUrlParser: true,
})

const Produto = require('./app/models/produto')

let app = express()

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

let port = process.env.port || 8000
let router = express.Router()

router.use(function (req, res, next) {
    console.log('Request...')

    next()
})

router.get('/', (req, res) => {
    res.json({ message: 'Beleza! Bem vindo a nossa loja XYZ.', })
})

router.route('/produtos')
    .post(function (req, res) {
        let produto = new Produto()

        produto.nome = req.body.nome
        produto.preco = req.body.preco
        produto.descricao = req.body.descricao

        produto.save(function (error) {
            if (error) res.send('Erro ao tentar salar o produto. ' + error)

            res.json({ message: 'Cadastrado.', })
        })
    })
    .get(function (req, res) {
        Produto.find(function (error, produtos) {
            if (error) res.send('Erro ao tentar selecionar todos os produtos. ' + error)

            res.json(produtos)
        })
    })

router.route('/produtos/:produto_id')
    .get(function (req, res) {
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error) res.send('Produto não encontrado. '+ error)

            res.json(produto)
        })
    })
    .put(function (req, res) {
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error) res.send('Produto não encontrado. ' + error)

            produto.nome = req.body.nome
            produto.preco = req.body.preco
            produto.descricao = req.body.descricao

            produto.save(function (error) {
                if (error) res.send('Não foi possível salvar. ' + erro)

                res.json({ message: 'Atualizado.', })
            })
        })
    })
    .delete(function (req, res) {
        Produto.remove({
            _id: req.params.produto_id,
        }, function (error) {
            if (error) res.send('Produto não encontrado. ' + error)

            res.json({ message: 'Excluído.', })
        })
    })

app.use('/api', router)

app.listen(port)

console.log('Iniciando a app na porta ' + port)