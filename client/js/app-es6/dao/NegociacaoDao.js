import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

        return new Promise((resolve, reject) => {

            // pedindo a transação e o tipo para gravar 
            let request = this._connection
                .transaction([this._store], 'readwrite')

            // Tendo acesso ao ObjectStore
                .objectStore(this._store)

            // Adicionando um object dentro do objectStore existente, porem o metodo add
            // devolve uma request
                .add(negociacao);

            request.onsucess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possivel adicionar a negociação');
            };
        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;
                
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();

                } else {
                    resolve(negociacoes);
                }

            };

            cursor.onerror =  e => {

                console.log(e.target.error);
                reject('Não foi possivel listar as negociação');
            };
        });    

    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações removidas com sucesso');

            request.onerror = e =>{

                console.log(e.target.error);
                reject('Não foi possivel remover as negociação');

            };
        });
    }
}