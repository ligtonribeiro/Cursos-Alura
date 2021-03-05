const Model = require('./ModelTableFornecedores')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar() {
        return Model.findAll();
    },

    inserir(fornecedor) {
        return Model.create(fornecedor);
    },

    async pegarPorId(id) {
        const encontrado = await Model.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado
    },

    async atualizar(id, dadosParaAtualizar) {
        return Model.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    },

    remover(id) {
        return Model.destroy({
            where: { id: id }
        })
    }
}