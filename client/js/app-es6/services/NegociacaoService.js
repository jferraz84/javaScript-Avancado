import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {

    constructor() {

        
        this.http = new HttpService();
    }

// cb = Callback
    obterNegociacoesDaSemana() {

        //return new Promise((resolve, reject) => {
        
            return this.http
                .get('negociacoes/semana')
                .then(negociacoes => {
                return negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                })
                .catch(erro => {
                    cponsole.log(erro);
                    reject("Não foi possivel obter as negociações da semana");
            //})
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        
        //return new Promise((resolve, reject) => {
        
            return this.http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                return negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                })
                .catch(erro => {
                    cponsole.log(erro);
                    reject("Não foi possivel obter as negociações da semana passada");
           // })
        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        //return new Promise((resolve, reject) => {
        
            return this.http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                return negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                })
                .catch(erro => {
                    cponsole.log(erro);
                    reject("Não foi possivel obter as negociações da semana retrasada");
            //})
        });
        
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection)) 
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionadsa com Sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel adicionar a Negociação')
            });

    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection)) 
            .then(dao => dao.listaTodos())
            .catch(() => {
                console.log(erro);
                throw new Error('Não foi possivel obter a Negociação')
            });

    }

    apaga() {
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociação apagadas com Sucesso')
            .catch(() => {
                console.log(erro);
                throw new Error('Não foi possivel apagar a Negociação')
            }); 

    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                !listaAtual.some(negociacaoExistente => 
                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
        )              
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possivel buscar Negociações para importar');
        });          
    }
    
}