"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = __importDefault(require("./modelos/cliente"));
const endereco_1 = __importDefault(require("./modelos/endereco"));
const telefone_1 = __importDefault(require("./modelos/telefone"));
const documento_1 = __importDefault(require("./modelos/documento"));
const tipoDocumento_1 = require("./enumeracoes/tipoDocumento");
const entrada_1 = __importDefault(require("./entrada"));
const entrada = new entrada_1.default();
console.log("1 - Iniciar Cadastro");
console.log(" Qualquer outra Tecla - Sair ");
let escolha = entrada.receberNumero("Digite a opção desejada: ");
if (escolha === 1) {
    console.log("Iniciando Cadastro...");
}
else {
    const loadingChars = ['|', '/', '-', '\\'];
    let i = 0;
    const loadingInterval = setInterval(() => {
        process.stdout.write(`\rSaindo... ${loadingChars[i]}`);
        i = (i + 1) % loadingChars.length;
    }, 250);
    setTimeout(() => {
        clearInterval(loadingInterval);
        console.log("\nSaindo...");
        process.exit(0);
    }, 5000);
}
let cliente = new cliente_1.default();
cliente.nome = `Pedro de Alcântara João Carlos Leopoldo Salvador`;
cliente.nomeSocial = `Dom Pedro II`;
cliente.dataCadastro = new Date(1840, 6, 23);
cliente.dataNascimento = new Date(1825, 11, 2);
let endereco = new endereco_1.default();
endereco.rua = `R. do Catete`;
endereco.bairro = `Copacabana`;
endereco.cidade = `Rio de Janeiro`;
endereco.estado = `Rio de Janeiro`;
endereco.pais = `Brasil`;
endereco.codigoPostal = `22220-000`;
let telefone = new telefone_1.default();
telefone.ddd = `21`;
telefone.numero = `99999-9999`;
let documento = new documento_1.default();
documento.numero = `123.456.789-00`;
documento.tipo = tipoDocumento_1.TipoDocumento.CPF; // Enum, tem que usar o TipoDocumento.*tipo do documento* ex: TipoDocumento.RG ou TipoDocumento.Passaporte
documento.dataExpedicao = new Date(1840, 6, 23);
cliente.telefone.push(telefone); // Aqui tem que ser push porque é um array
cliente.endereco = endereco;
cliente.documentos.push(documento); // mesma lógica do telefone
let dependente = new cliente_1.default();
dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`;
dependente.nomeSocial = `Princesa Isabel`;
dependente.dataCadastro = new Date(1921, 10, 14);
dependente.dataNascimento = new Date(1846, 6, 29);
dependente.endereco = cliente.endereco.clonar();
dependente.titular = cliente;
cliente.dependentes.push(dependente);
console.log(cliente);
console.log(dependente);
