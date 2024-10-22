"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Telefone = /** @class */ (function () {
    function Telefone() {
    }
    Telefone.prototype.clonar = function () {
        var telefone = new Telefone();
        telefone.ddd = this.ddd;
        telefone.numero = this.numero;
        return telefone;
    };
    return Telefone;
}());
exports.default = Telefone;
