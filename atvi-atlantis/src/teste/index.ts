import Cliente from "./modelos/cliente";
import Endereco from "./modelos/endereco";
import Telefone from "./modelos/telefone";
import Documento from "./modelos/documento";
import { TipoDocumento } from "./enumeracoes/tipoDocumento";

let cliente = new Cliente()
cliente.nome = `Pedro de Alcântara João Carlos Leopoldo Salvador`
cliente.nomeSocial = `Dom Pedro II`
cliente.dataCadastro = new Date(1840, 6, 23)
cliente.dataNascimento = new Date(1825, 11, 2)

let endereco = new Endereco()
endereco.rua = `R. do Catete`
endereco.bairro = `Copacabana`
endereco.cidade = `Rio de Janeiro`
endereco.estado = `Rio de Janeiro`
endereco.pais = `Brasil`
endereco.codigoPostal = `22220-000`

let telefone = new Telefone()
telefone.ddd = `21`
telefone.numero = `99999-9999`

let documento = new Documento()
documento.numero = `123.456.789-00`
documento.tipo = TipoDocumento.CPF // Enum, tem que usar o TipoDocumento.*tipo do documento* ex: TipoDocumento.RG ou TipoDocumento.Passaporte
documento.dataExpedicao = new Date(1840, 6, 23)

cliente.telefone.push(telefone) // Aqui tem que ser push porque é um array
cliente.endereco = endereco
cliente.documentos.push(documento) // mesma lógica do telefone

let dependente = new Cliente()
dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
dependente.nomeSocial = `Princesa Isabel`
dependente.dataCadastro = new Date(1921, 10, 14)
dependente.dataNascimento = new Date(1846, 6, 29)
dependente.endereco = (cliente.endereco.clonar() as Endereco)
dependente.titular = cliente
cliente.dependentes.push(dependente)

console.log(cliente);
console.log(dependente);
