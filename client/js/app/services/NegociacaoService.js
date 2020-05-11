class NegociacaoService {

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
}