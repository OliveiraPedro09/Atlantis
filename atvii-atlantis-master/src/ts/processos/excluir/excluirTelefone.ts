import Processo from "../../abstracoes/processo";
import Telefone from "../../modelos/telefone";
import Entrada from "../../io/entrada";
import Armazem from "../../dominio/armazem";
import verificarCliente from "../verificacao/verificarCliente";
import verificarTelefone from "../verificacao/verificarTelefone";
import Cliente from "../../modelos/cliente";

export default class ExcluirTelefone extends Processo {
    private armazem: Armazem;
    private impressor!: Entrada;

    constructor () {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log(`****************************`)
        console.log(' Iniciando Remoção de Telefone: ')
        console.log(`****************************`)

        const numeroDocumento = this.entrada.receberTexto('Digite o número do documento do cliente:').trim()
        const cliente = verificarCliente(this.armazem.Clientes, numeroDocumento)
        
        if (!cliente) {
            console.log('Cliente não encontrado. Tente novamente!')
            return
        }

        const telefones = cliente.Telefones

        if (telefones.length === 0) {
            console.log('O cliente não possui nenhum telefone cadastrado.')
            return
        }

        if (telefones.length === 1) {
            console.log('Existe apenas um telefone cadastrado. Você deve cadastrar um novo telefone para prosseguir com a exclusão.')
            return
        }

        let ddd = this.entrada.receberTexto('Qual o DDD do telefone que deseja excluir?').trim()
        let numero = this.entrada.receberTexto('Qual o numero de telefone que deseja excluir?').trim()
        let telefoneAtual = verificarTelefone(this.armazem.Clientes, ddd, numero)[1] 

        if(!telefoneAtual){
            console.log('Telefone não encontrado!')
            return
        }

        const indice = cliente.Telefones.findIndex(tel => tel.Ddd === telefoneAtual.Ddd && tel.Numero === telefoneAtual.Numero)
        
        if (indice === -1) {
            console.log('Erro ao desassociar telefone do cliente: Telefone não encontrado na lista.')
            return
        }
        
        cliente.Telefones.splice(indice, 1)
        if(cliente.Dependentes.length > 0){
            this.atualizaTelefoneDependentes(cliente.Dependentes,cliente)
        }
        
        console.log(`****************************`)
        console.log('Telefone Removido')
        console.log(`****************************`)
    }
    private atualizaTelefoneDependentes(dependentes: Cliente[], titular: Cliente) {
        for (const dependente of dependentes) {
            dependente.setTelefone(titular.Telefones.map(tel => tel.clonar() as Telefone))
        }
    }
}