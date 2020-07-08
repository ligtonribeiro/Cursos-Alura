class DateHelper {

    textoParaData(texto) {
        return new Date(
            ...texto.split('-')
                    .map((item, indice) => item - indice % 2)
        );
    }

    DataParaTexto(data) {
        return data.getDate() 
            + '/' + (data.getMonth() + 1) 
            + '/' + data.getFullYear();

        // Template String 
        // `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}