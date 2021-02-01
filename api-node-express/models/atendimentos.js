const moment = require('moment');
const { restart } = require('nodemon');
const conexao = require('../infraestrutura/conexao');
class Atendimento {
    Adicionar(atendimento, res) {
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
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (error, results) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(atendimento)
                }
            });
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
        conexao.query(sql, (error, results) => {
            const atendimento = results[0];
            if (error) {
                res.status(400).json(error);
            } else {
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