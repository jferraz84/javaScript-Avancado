class ListaNegociacoes {

    constructor(){

        this._negociacoes = []; // -> Cria uma lista de negociacoes
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);

    }

    get negociacoes() {

        return [].concat(this._negociacoes);
    }

}