import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import CadastrarDocumentosCliente from "../tipo/tipoCadastrarDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro do dependente...')

        let docTitular = this.entrada.receberTexto('Qual o documento do titular?')
        let armazem = Armazem.InstanciaUnica
        const clienteTitular = armazem.Clientes.find(cliente => cliente.Documentos.some(documento => documento.Numero === docTitular))

        if (!clienteTitular) {
            console.log('Titular não encontrado')
            return
        }
        while(true){
            let nome = this.entrada.receberTexto('Qual o nome do dependente?')
            let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?')
            let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
            let dependente = new Cliente(nome, nomeSocial, dataNascimento)

            dependente.setEndereco(clienteTitular.Endereco.clonar() as Endereco)
            dependente.setTelefone(clienteTitular.Telefones.map(tel => tel.clonar() as Telefone))
            dependente.setTitular(clienteTitular)

            this.processo = new CadastrarDocumentosCliente(dependente)
            this.processo.processar()

            let armazem = Armazem.InstanciaUnica
            armazem.Clientes.push(dependente)

            console.log('Finalizando o cadastro do dependente...')
        }
        
    }
}