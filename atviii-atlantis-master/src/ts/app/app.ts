import Processo from "../abstracoes/processo";
import CadastroAcomodacoes from "../processos/cadastro/cadastroAcomodacoes";
import Principal from "../processos/principal";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Telefone from "../modelos/telefone";
import Endereco from "../modelos/endereco";

console.clear();
console.log(`Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);

// Adicionando usuários de teste
const armazem = Armazem.InstanciaUnica;

const cliente1 = new Cliente("João Silva", "João", new Date(1990, 5, 15));
const rg1 = new Documento("527404421", TipoDocumento.RG, new Date(2010, 6, 20));
const tele1 = new Telefone("12", "123456789");
const end1 = new Endereco("Rua João Rodrigues", "JD REY", "SJC", "São Paulo", "BRASIL", "12345-678");
cliente1.Documentos.push(rg1);
cliente1.setTelefones([tele1]);
cliente1.setEndereco(end1);


const cliente2 = new Cliente("Maria Oliveira", "Maria", new Date(1985, 3, 10));
const rg2 = new Documento("123456789", TipoDocumento.RG, new Date(2005, 4, 15));
const tele2 = new Telefone("11", "987654321");
const end2 = new Endereco("Rua João Rodrigues", "JD REY", "SJC", "São Paulo", "BRASIL", "12345-678");
cliente2.Documentos.push(rg2);
cliente2.setTelefones([tele2]);
cliente2.setEndereco(end2);

const cliente3 = new Cliente("Carlos Pereira", "Carlos", new Date(1978, 11, 25));
const rg3 = new Documento("987654321", TipoDocumento.RG, new Date(2000, 1, 30));
const tele3 = new Telefone("13", "456789123");
const end3 = new Endereco("AV. BR", "Pinheiros", "SP", "SP", "BRASIL", "12345-100");
cliente3.Documentos.push(rg3);
cliente3.setTelefones([tele3]);
cliente3.setEndereco(end3);

armazem.Clientes.push(cliente1);
armazem.Clientes.push(cliente2);
armazem.Clientes.push(cliente3);


let processo: Processo;
let execucao: Boolean = true;

processo = new CadastroAcomodacoes();
processo.processar();

while (execucao) {
    processo = new Principal();
    processo.processar();
    execucao = processo.Execucao;
}