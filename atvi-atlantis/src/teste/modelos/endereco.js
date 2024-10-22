"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Endereco = /** @class */ (function () {
    function Endereco() {
    }
    Endereco.prototype.clonar = function () {
        var endereco = new Endereco();
        endereco.rua = this.rua;
        endereco.bairro = this.bairro;
        endereco.cidade = this.cidade;
        endereco.estado = this.estado;
        endereco.pais = this.pais;
        endereco.codigoPostal = this.codigoPostal;
        return endereco;
    };
    return Endereco;
}());
exports.default = Endereco;
