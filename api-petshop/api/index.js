const express = require('express');
const config = require('config');
const app = express();
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');

app.use(express.json());

const router = require('./routers/fornecedores');

app.use('/api/fornecedores', router);
app.use((error, req, res, next) => {
    let status = 500
    if (error instanceof NaoEncontrado) {
        status = 404
    }

    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
        status = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
    }

    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro
        })
    )
});

app.listen(config.get('api.port'), () => console.log('API Petshop ON'));