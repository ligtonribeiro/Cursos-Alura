const ModelTable = require('../routers/fornecedores/ModelTableFornecedores');

ModelTable
    .sync()
    .then(() => console.log('Tabela criada com sucesso!'))
    .catch(console.log);