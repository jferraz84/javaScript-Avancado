class Negociacao {

    constructor(data, quantidade, valor){
        // instanciando uma nova data para que não aja perigo de ser mudado a data original
        this._data = new Date(data.getTime()); 
        this._quantidade = 1;
        this._valor = 0.0;

        // Congelando os valores para não serem alterados dps de intanciados.
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data(){
        return new Date(this._data.getTime);
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

}