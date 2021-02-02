const conexao = require('../infraestrutura/conexao');
const uploadDeArquivo = require('../arquivos/UploadDeArquivos');

class Pets {
    adicionar(pet, res) {
        const sql = 'INSERT INTO Pets SET ?'

        uploadDeArquivo(pet.imagem, pet.nome, (error, novoCaminho) => {
            
            if (error) {
                res.status(400).json({ erro: error })
            } else {
                const novoPet = { nome: pet.nome, imagem:  novoCaminho }
                conexao.query(sql, novoPet, error => {
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.status(201).json(novoPet);
                    }
                })
            }
        });
    };
};

module.exports = new Pets();