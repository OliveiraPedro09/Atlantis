import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Armazem from "../../dominio/armazem";
import verificarDocumento from "../verificar/verificarDocumento";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let numDoc = this.entrada.receberTexto('Digite o número do RG: ')
        let documentoencontrado = verificarDocumento(armazem.Clientes, numDoc)[0]

        if(documentoencontrado){
            console.log('Documento já cadastrado')
            return
        }

        let dataemissao = this.entrada.receberData('Digite a data de emissão do RG: ')
        let rg = new Documento(numDoc, TipoDocumento.RG, dataemissao)
        this.cliente.Documentos.push(rg)
    }
}