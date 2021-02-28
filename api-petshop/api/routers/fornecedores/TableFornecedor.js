const Model = require('./ModelTableFornecedores')

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
            throw new Error('Fornecedor não encontrado!')
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