const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect(error => {
    if (error) {
        console.log(error, 'Erro com a conexão ao banco de dados')
    } else {
        console.log('Conexão ao banco de dados com sucesso!!')

        Tabelas.init(conexao);

        const app = customExpress();
        app.listen(3000, () => console.log('Server is running on port 3000'));
    }
});
