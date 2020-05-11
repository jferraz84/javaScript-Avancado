class HttpService {

    get(url) {

        return new Promise((resolve, reject ) => {
    
        /*Configurações de estado de requisições
            0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição concluida e a resposta esta pronta */

        
                let xhr = new XMLHttpRequest();
        
                // Operação que vai ser realizada pelo servidor e endereço do servido
                xhr.open('GET', url);

        // Uma requisição passa por estados,
        //  nome da propriedade em português é "Pronto para mudança de estado".
                xhr.onreadystatechange = () => {
        
                    if (xhr.readyState == 4) {
                        
                        if (xhr.status == 200) {
                        
                           resolve(JSON.parse(xhr.responseText));
    
                        }else {
                            reject(xhr.responseText);
                        }
        
                    }
                };
        
                xhr.send();

        });
    }

    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }

}