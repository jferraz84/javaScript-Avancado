class NegociacaoService {

// cb = Callback
    obterNegociacoesDaSemana(cb) {
        
        let xhr = new XMLHttpRequest();

        // Operação que vai ser realizada pelo servidor e endereço do servido
        xhr.open('GET', 'negociacoes/semana');

        /*Configurações de estado de requisições
            0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição concluida e a resposta esta pronta */

        // Uma requisição passa por estados,  nome da propriedade em português é "Pronto para mudança de estado".
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {
                
                if (xhr.status == 200) {
                
                   cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    
                }else {
                    console.log(xhr.responseText);
                    cb("Não foi possivel obter as negociações", null);
                }

            }
        };

        xhr.send();
    }

}