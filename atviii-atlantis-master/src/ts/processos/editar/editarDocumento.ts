import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import verificarDocumento from "../verificar/verificarDocumento";
import Impressor from "../../interfaces/impressor";
import ImpressorDocumentos from "../../impressores/impressorDocumentos";

export default class EditarDocumento extends Processo {
    private cliente: Cliente
    private armazem: Armazem
    private impressor!: Impressor

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log('Editar Documento')

        let documentoAtual = this.cliente.Documentos

        if(documentoAtual.length === 0 ){
            console.log('Cliente não possui documentos cadastrados.')
            return
        }

        this.impressor = new ImpressorDocumentos(documentoAtual)
        console.log(this.impressor.imprimir())

        while(true){
            let numDoc = this.entrada.receberTexto('Digite o número do documento que deseja editar: ')
            let documentoAtual = verificarDocumento(this.armazem.Clientes, numDoc)[1]

            if(!documentoAtual){
                console.log('Documento não encontrado.')
                return
            }

            let novoNumDoc = this.entrada.receberTexto('Digite o novo número do documento: ')
            if(novoNumDoc){
                let documentoEncrontrado = verificarDocumento(this.armazem.Clientes, novoNumDoc)[1]
                if(documentoEncrontrado){
                    console.log('Número do documento já cadastrado.')
                    return
                }
            }
            documentoAtual.setNumero(novoNumDoc)

            let dataEmissao = this.entrada.receberData('Digite a data de emissão do documento: ')
            if(dataEmissao && !isNaN(dataEmissao.getTime())){
                documentoAtual.setDataExpedicao(dataEmissao)
            }

            console.log('Documento editado com sucesso.')

            let continuar = this.entrada.receberTexto('Deseja editar outro documento? (s/n): ')
            if(continuar.toLowerCase() == 'n'){
                break
            }
        }
    }
}