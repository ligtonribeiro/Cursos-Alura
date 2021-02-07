const moment = require('moment');
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento')
class Atendimento {
    constructor() {
        
        this.validaData = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.validaNome = tamanho => tamanho >= 5;
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]
            
            return !campo.valida(parametro)
        })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.validaData,
                mensagem: 'Data deve ser maior ou igua a data atual'
            },
            {
                nome: 'nome',
                valido: this.validaNome,
                mensagem: 'Nome deve ter pelo menos cinco caracteres'
            }
        ];
    }


    Adicionar(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: {data, dataCriacao},
            cliente: { tamanho: atendimento.cliente.length }
        }
        
        const erros = this.valida(parametros)
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
        return repositorio.lista()
            .then(results => res.json(results))
            .catch(error => res.status(400).json(error))
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