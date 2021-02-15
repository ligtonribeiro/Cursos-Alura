const TableFornecedor = require('./TableFornecedor');

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categora = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        const resultado = await TableFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categora
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await TableFornecedor.pegarPorId(this.id)
        
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categora = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }
}

module.exports = Fornecedor;