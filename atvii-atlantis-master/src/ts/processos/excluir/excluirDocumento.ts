import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Entrada from "../../io/entrada";
import Cliente from "../../modelos/cliente";
import verificarCliente from "../verificacao/verificarCliente";
import verificarDoc from "../verificacao/verificarDoc";

export default class ExcluiDocumento extends Processo {
    private armazem: Armazem;
    protected entrada: Entrada;

    constructor() {
        super();
        this.armazem = Armazem.InstanciaUnica;
        this.entrada = new Entrada();
    }

    processar(): void {
        console.log(`****************************`)
        console.log(' Iniciando Remoção de Documento: ')
        console.log(`****************************`)

        const numeroDocumento = this.entrada.receberTexto('Digite o número do documento do cliente:').trim()
        const cliente = verificarCliente(this.armazem.Clientes, numeroDocumento)
        
        if (!cliente) {
            console.log('Cliente não encontrado. Tente novamente!')
            return
        }

        const documentos = cliente.Documentos

        if (documentos.length === 0) {
            console.log('O cliente não possui nenhum documento cadastrado.')
            return
        }

        if (documentos.length === 1) {
            console.log('Existe apenas um documento cadastrado. Você deve cadastrar um novo documento para prosseguir com a exclusão.')
            return
        }

        const numero = this.entrada.receberTexto('Qual o número do documento que deseja excluir?').trim()
        const documentoExiste = verificarDoc(this.armazem.Clientes, numero)[1]

        if (!documentoExiste) {
            console.log('Documento não encontrado.')
            return
        }

        const indice = cliente.Documentos.findIndex(doc => doc.Numero === documentoExiste.Numero && doc.Tipo === documentoExiste.Tipo && doc.DataExpedicao === documentoExiste.DataExpedicao)
        
        if (indice === -1) {
            console.log('Erro ao desassociar documento do cliente: Documento não encontrado na lista.')
            return
        }
        
        cliente.Documentos.splice(indice, 1)
        
        console.log(`****************************`)
        console.log(' Documento Removido ')
        console.log(`****************************`)
    }
}