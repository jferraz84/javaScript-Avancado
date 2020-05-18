
const stores = ['negociacoes'];
const version = 3;
const dbName = 'aluraframe';

let connection = null;
let close = null;


export class ConnectionFactory {

    constructor(){

        throw new Error('Não é possivel criar instancia de ConnectionFactory');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {
        
            let openRequest = window.indexedDB.open(dbName, version);
            
            // TRIÁDE de conexão, isso deve ser sempre usado uma conexão com banco
            openRequest.onupgradeneeded = e => {
        
                ConnectionFactory._createStore(e.target.result);
            };
        
            openRequest.onsuccess = e => {

                if (!connection) {
                    connection = e.target.result; // '!CONNECTION' =  se a conexão é falso
                    close = connection.close.bind(connection);
                    connection.close = function(){
                        throw new Error('Não é possivel fechar diretamente a conexão');
                    }
                }
                    resolve(connection);
                    
                
            };
        
            openRequest.onerror = e => {
        
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
        
    }
    
    static _createStore(connection){
        
        stores.forEach(store => {
    
            if(connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);
    
                connection.createObjectStore(store, {autoIncrement: true});
        });
    }
        static closeConnection(){
            if (connection) {
                close();
                connection = null;
            }
        }
  }

     
