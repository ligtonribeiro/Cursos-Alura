const moment = require('moment');
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento')
class Atendimento {
    Adicionar(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const validaData = moment(data).isSameOrAfter(dataCriacao);
        const validaNome = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: validaData,
                mensagem: 'Data deve ser maior ou igua a data atual'
            },
            {
                nome: 'nome',
                valido: validaNome,
                mensagem: 'Nome deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros) {
            return new Promise((resolve, reject) => {
                reject(error)
                res.status(400).json(error)
            })
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            return repositorio.adiciona(atendimentoDatado)
                .then(results => {
                    const id = results.insertId
                    return {...atendimento, id}
                })
        }
    }

    listar(res) {
        const sql = 'SELECT * FROM atendimentos'
        conexao.query(sql, (error, results) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`
        conexao.query(sql, async (error, results) => {
            const atendimento = results[0];
            const cpf = atendimento.cliente;
            if (error) {
                res.status(400).json(error);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        })
    }

    alterar(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'
        conexao.query(sql, [valores, id], (error, results) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id, ...valores})
            }
        })
    }

    deletar(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'
        conexao.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id})
            }
        })
    }
};

module.exports = new Atendimento;