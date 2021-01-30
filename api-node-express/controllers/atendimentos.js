const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Rota atendimento / GET'));

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.Adicionar(atendimento, res)

    });
}