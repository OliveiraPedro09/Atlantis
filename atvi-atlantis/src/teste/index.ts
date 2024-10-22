import Cliente from "./modelos/cliente";
import Endereco from "./modelos/endereco";
import Telefone from "./modelos/telefone";
import Documento from "./modelos/documento";
import { TipoDocumento } from "./enumeracoes/tipoDocumento";
import Entrada from "./entrada";

const entrada = new Entrada();
console.log("=====================================");
console.log("          MENU DE CADASTRO           ");
console.log("=====================================");
console.log("1 - Iniciar Cadastro");
console.log("2 - Sair");
console.log("=====================================");

let escolha = entrada.receberNumero("Digite a opção desejada: ");
if (escolha === 1) {
    const loadingChars = ['|', '/', '-', '\\'];
    let i = 0;

    const loadingInterval = setInterval(() => {
        process.stdout.write(`\rCarregando... ${loadingChars[i]}`);
        i = (i + 1) % loadingChars.length;
    }, 250);

    setTimeout(() => {
        clearInterval(loadingInterval);
        process.stdout.write('\rIniciando...\n');
        cadastroUsuario();
    }, 2000);
} else if (escolha === 2) {
    const loadingChars = ['|', '/', '-', '\\'];
    let i = 0;

    const loadingInterval = setInterval(() => {
        process.stdout.write(`\rSaindo... ${loadingChars[i]}`);
        i = (i + 1) % loadingChars.length;
    }, 250);

    setTimeout(() => {
        clearInterval(loadingInterval);
        console.log("\nObrigado!");
        process.exit(0);
    }, 3000);
} else {
    console.log("Opção inválida!");
}

function cadastroUsuario() {
    const cliente = new Cliente()
    cliente.nome = entrada.receberTexto("Digite o nome do cliente")
    cliente.nomeSocial = entrada.receberTexto("Digite o nome social do cliente")
    cliente.dataCadastro = entrada.receberData("Digite a data de cadastro do cliente")
    cliente.dataNascimento = entrada.receberData("Digite a data de nascimento do cliente")
    console.log("");
    cadastroDocumento(cliente)
    cadastroEndereco(cliente)
    cadastroTelefone(cliente)

    let adicionarDependente = true;
    while (adicionarDependente) {
        console.log("=====================================");
        console.log("");
        console.log("Deseja cadastrar um dependente?");
        console.log("1 - Sim");
        console.log("2 - Não");
        console.log("");
        console.log("=====================================");
        console.log("");
        let escolhadependente = entrada.receberNumero("Digite a opção desejada: ");
        console.log("");
        console.log("");
        if (escolhadependente === 1) {
            cadastroDepedente(cliente);
        } else if (escolhadependente === 2) {
            adicionarDependente = false;
        } else if (escolhadependente !== 1 && escolhadependente !== 2) {
            console.log("Opção inválida!");
            return cadastroUsuario();
        }
    }

    console.log("=====================================");
    console.log("");
    console.log("Cadastro finalizado!");
    console.log("");
    console.log("=====================================");
    console.log("");
    console.log("");
    console.log("============= CLIENTE ===============");
    console.log("");
    console.log("Nome: " + cliente.nome)
    console.log("");
    console.log("Nome Social: " + cliente.nomeSocial)
    console.log("");
    console.log("Data de Cadastro: " + cliente.dataCadastro)
    console.log("");
    console.log("Data de Nascimento: " + cliente.dataNascimento)
    console.log("");
    console.log("");
    console.log("=====================================");
    console.log("");
    console.log("Documentos: ")
    cliente.documentos.forEach(documento => {
        console.log("Tipo: " + documento.tipo)
        console.log("Número: " + documento.numero)
        console.log("Data de Expedição: " + documento.dataExpedicao)
    });
    console.log("");
    console.log("=====================================");
    console.log("");
    console.log("");
    console.log("=====================================");
    console.log("");
    console.log("Endereço: ")
    console.log("");
    console.log("=====================================");
    console.log("");
    console.log("Rua: " + cliente.endereco.rua)
    console.log("Bairro: " + cliente.endereco.bairro)
    console.log("Cidade: " + cliente.endereco.cidade)
    console.log("");    
    console.log("");
    console.log("=====================================");
    console.log("");
    console.log("Telefones: ")
    console.log("");
    console.log("=====================================");
    console.log("");
    cliente.telefone.forEach(telefone => {
        console.log("DDD: " + telefone.ddd)
        console.log("Número: " + telefone.numero)
    });

    console.log("=====================================");
    console.log("");
    console.log("Dependentes: ")
    console.log("");
    console.log("=====================================");
    console.log("");
    cliente.dependentes.forEach(dependente => {
        console.log("Nome: " + dependente.nome)
        console.log("");
        console.log("Nome Social: " + dependente.nomeSocial)
        console.log("");
        console.log("Data de Cadastro: " + dependente.dataCadastro)
        console.log("");
        console.log("Data de Nascimento: " + dependente.dataNascimento)
        console.log("");
        console.log("=====================================");
        console.log("");
        console.log("Documentos: ")
        dependente.documentos.forEach(documento => {
            console.log("Tipo: " + documento.tipo)
            console.log("Número: " + documento.numero)
            console.log("Data de Expedição: " + documento.dataExpedicao)
        });
        console.log("");
        console.log("=====================================");
        console.log("");
        console.log("");
        console.log("=====================================");
        console.log("");
        console.log("Endereço: ")
        console.log("");
        console.log("=====================================");
        console.log("");
        console.log("Rua: " + dependente.endereco.rua)
        console.log("Bairro: " + dependente.endereco.bairro)
        console.log("Cidade: " + dependente.endereco.cidade)
    });

}

function cadastroEndereco(cliente){
    const endereco = new Endereco()
    endereco.rua = entrada.receberTexto("Digite a rua desejada: ")
    endereco.bairro = entrada.receberTexto("Digite o bairro desejado: ")
    endereco.cidade = entrada.receberTexto("Digite a cidade desejada: ")
    endereco.estado = entrada.receberTexto("Digite o estado desejado: ")
    endereco.pais = entrada.receberTexto("Digite o país desejado: ")
    endereco.codigoPostal = entrada.receberTexto("Digite o código postal desejado: ")
    cliente.endereco = endereco
}

function cadastroTelefone(cliente) {
    let adicionarTelefone = true;
    while (adicionarTelefone) {
        const telefone = new Telefone();
        telefone.ddd = entrada.receberTexto("Digite o DDD desejado: ");
        telefone.numero = entrada.receberTexto("Digite o número desejado: ");
        cliente.telefone.push(telefone);

        const resposta = entrada.receberTexto("Deseja adicionar mais um telefone? (s/n): ");
        adicionarTelefone = resposta.toLowerCase() === 's';
    }
}

function cadastroDocumento(cliente) {
    let adicionarDocumento = true;
    while (adicionarDocumento) {
        const documento = new Documento();
        console.log("=====================================");
        console.log("");
        console.log("1 - CPF");
        console.log("2 - RG");
        console.log("3 - Passaporte");
        console.log("");
        console.log("=====================================");
        console.log("");
        let opcao = entrada.receberNumero("Digite a opção desejada: ");
        if (opcao === 1) {
            documento.tipo = TipoDocumento.CPF;
        } else if (opcao === 2) {
            documento.tipo = TipoDocumento.RG;
        } else if (opcao === 3) {
            documento.tipo = TipoDocumento.Passaporte;
        } else {
            console.log("Opção inválida!");
            continue;
        }
        documento.numero = entrada.receberTexto("Digite o número do documento: ");
        documento.dataExpedicao = entrada.receberData("Digite a data de expedição do documento: ");
        cliente.documentos.push(documento);

        const resposta = entrada.receberTexto("Deseja adicionar mais um documento? (s/n): ");
        adicionarDocumento = resposta.toLowerCase() === 's';
}

}

function cadastroDepedente(cliente){
    let adicionarDependente = true;
    while (adicionarDependente) {
        const dependente = new Cliente();
        dependente.nome = entrada.receberTexto("Digite o nome do dependente: ");
        dependente.nomeSocial = entrada.receberTexto("Digite o nome social do dependente: ");
        dependente.dataCadastro = entrada.receberData("Digite a data de cadastro do dependente: ");
        dependente.dataNascimento = entrada.receberData("Digite a data de nascimento do dependente: ");
        dependente.endereco = cliente.endereco.clonar() as Endereco;
        cadastroDocumento(dependente);
        dependente.titular = cliente;
        dependente.telefone = cliente.telefone.map(t => t.clonar() as Telefone);
        cliente.dependentes.push(dependente);

        const resposta = entrada.receberTexto("Deseja adicionar mais um dependente? (s/n): ");
        adicionarDependente = resposta.toLowerCase() === 's';
    }
}