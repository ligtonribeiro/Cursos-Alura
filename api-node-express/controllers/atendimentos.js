const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listar(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.Adicionar(atendimento)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado)
            }).catch(error => {
                res.status(400).json(error)
            })
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimento.alterar(id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.deletar(id, res);
    })
}