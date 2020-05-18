"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
    function Negociacao(data, quantidade, valor) {
        _classCallCheck(this, Negociacao);

        // instanciando uma nova data para que não aja perigo de ser mudado a data original
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        // Congelando os valores para não serem alterados dps de intanciados.
        Object.freeze(this);
    }

    _createClass(Negociacao, [{
        key: "volume",
        get: function get() {
            return this._quantidade * this._valor;
        }
    }, {
        key: "data",
        get: function get() {
            return new Date(this._data.getTime());
        }
    }, {
        key: "quantidade",
        get: function get() {
            return this._quantidade;
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        }
    }]);

    return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map