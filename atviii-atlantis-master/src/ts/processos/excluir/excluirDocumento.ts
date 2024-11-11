import Armazem from "../../dominio/armazem";
import Processo from "../../abstracoes/processo";
import Impressor from "../../interfaces/impressor";
import verificarCliente from "../verificar/verificarCliente";
import verificarDocumento from "../verificar/verificarDocumento";


export default  class ExcluirDocumento extends Processo {
    private armazem: Armazem;

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log("Excluindo documento...")

        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!cliente){
            console.log("Não encontrado.")
            return
        }

        const documento = cliente.Documentos

        if(documento.length === 0){
            console.log("Cliente não possui documentos cadastrados.")
            return
        }

        if(documento.length === 1){
            console.log("Cliente possui apenas um documento cadastrado.")
            return
        }

        const numero = this.entrada.receberTexto("Digite o número do documento: ")
        const documentoEncontrado = verificarDocumento(this.armazem.Clientes, numero)[1]

        if(!documentoEncontrado){
            console.log("Documento não encontrado.")
            return
        }

        const index = cliente.Documentos.findIndex(documento => documento.Numero === documentoEncontrado.Numero && documento.Tipo === documentoEncontrado.Tipo && documento.DataExpedicao === documentoEncontrado.DataExpedicao) 

        if (index === -1){
            console.log("Documento não encontrado.")
            return
        }

        cliente.Documentos.splice(index, 1)

        console.log("Documento excluído com sucesso.")

    }
}