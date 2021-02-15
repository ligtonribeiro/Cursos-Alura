const router = require('express').Router();
const TableFornecedor = require('./TableFornecedor');
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
    const resultados = await TableFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
});

router.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    res.send(
        JSON.stringify(fornecedor)
    )
});

router.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch(error) {
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
});

module.exports = router;