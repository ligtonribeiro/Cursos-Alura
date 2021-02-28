const router = require('express').Router();
const TableFornecedor = require('./TableFornecedor');
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
    const resultados = await TableFornecedor.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
});

router.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        res.status(201)
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
});

router.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200)
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch(error) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
});

router.put('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        res.status(400)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
});

router.delete('/:idFornecedor', async (req, res) =>{
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end()
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
});

module.exports = router;