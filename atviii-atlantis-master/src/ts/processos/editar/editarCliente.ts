import verificarCliente from "../verificar/verificarCliente";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaoCliente from "../../impressores/impressorCliente";
import verificarTitular from "../verificar/verificarTitular";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import CadastrarTelefone from "../cadastro/cadastroTelefone";
import CadastroDocumentosCliente from "../tipo/tipoCadastroDocumentosCliente";
import EditarTelefone from "./editarTelefone";
import EditarDocumento from "./editarDocumento";
import EditarEndereco from "./editarEndereco";


export default class EditarCliente extends Processo{
    private armazem: Armazem
    private impressor!: Impressor
    
    private adicionarDocumentos(cliente: Cliente){
        this.processo = new CadastroDocumentosCliente(cliente)
        this.processo.processar()
    }
    private adicionarTelefone(cliente: Cliente, clienteTitular: boolean){
        if(!clienteTitular){
            this.processo = new CadastrarTelefone(cliente)
            this.processo.processar()         
        }else{
            console.log('Esta opção é apenas para titulares.');
        }
    }
    private editarEndereco(cliente: Cliente, clienteTitular: boolean){
        if(!clienteTitular){
            this.processo = new EditarEndereco(cliente)
            this.processo.processar()        
        }else{
            console.log('Esta opção é apenas para titulares.');
        }
    }
    private editarTelefone(cliente: Cliente, clienteTitular: boolean){
        if(!clienteTitular){
            this.processo = new EditarTelefone(cliente)
            this.processo.processar()      
        }else{
            console.log('Esta opção é apenas para titulares.');
        }
    }
    private editarDocumetos(cliente: Cliente){
        this.processo = new EditarDocumento(cliente)
        this.processo.processar()
    }

    constructor(){
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log('Editar Cliente')

        let numDoc = this.entrada.receberTexto('Digite o número do documento do cliente que deseja editar: ')
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!cliente){
            console.log('Cliente não encontrado')
            return
        }

        let titular = verificarTitular(cliente)
        
        this.impressor = new ImpressaoCliente(cliente)
        console.log(this.impressor.imprimir())

        let novoNome = this.entrada.receberTexto('Digite o novo nome do cliente: ')
        if(novoNome){
            cliente.setNome(novoNome)
        }
        let novoNomeSocial = this.entrada.receberTexto('Digite o novo nome social do cliente: ')
        if(novoNomeSocial){
            cliente.setNomeSocial(novoNomeSocial)
        }
        let novaDataNascimento = this.entrada.receberData('Digite a nova data de nascimento do cliente: ')
        if(novaDataNascimento){
            cliente.setDataNascimento(novaDataNascimento)
        }
        console.log('Selecione uma opção: ')
        console.log('1 - Adicionar Documento')
        console.log('2 - Adicionar Telefone (Opção apenas para titular)')
        console.log('3 - Editar Endereço (Opção apenas para titular)')
        console.log('4 - Editar Telefone (Opção apenas para titular)')
        console.log('5 - Editar Documeto')
        console.log('6 - Finalizar Atualização')

        let opcao = this.entrada.receberNumero('Qual a opção desejada?')

        switch(opcao){
            case 1:
                this.adicionarDocumentos(cliente)
                break
            case 2:
                this.adicionarTelefone(cliente, titular)
                break
            case 3:
                this.editarEndereco(cliente, titular)
                break
            case 4:
                this.editarTelefone(cliente, titular)
                break
            case 5:
                this.editarDocumetos(cliente)
                break
        }
        console.log('Cliente editado com sucesso.')
    }
}