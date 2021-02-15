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
    }
}