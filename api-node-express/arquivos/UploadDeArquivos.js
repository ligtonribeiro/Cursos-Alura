const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImageCriada) => {
    
    const tiposValidos = ['jpg', 'png', 'jpeg'];
    const tipo = path.extname(caminho);
    const validaTipos = tiposValidos.indexOf(tipo.substring(1)) !== -1;
    
    if (!validaTipos) {
        const error = 'Tipo inválido';
        callbackImageCriada(error);
    } else {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImageCriada(false, novoCaminho));
    }
}