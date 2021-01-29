const conexao = require('../infraestrutura/conexao');

class Atendimento {
    Adicionar(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimento, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
            }
        })
    }
}

module.exports = new Atendimento