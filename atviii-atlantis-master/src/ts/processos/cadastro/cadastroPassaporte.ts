import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import verificarDocumento from "../verificar/verificarDocumento";


export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let numDoc = this.entrada.receberTexto('Digite o número do Passaporte: ')
        let documentoencontrado = verificarDocumento(armazem.Clientes, numDoc)[0]

        if(documentoencontrado){
            console.log('Documento já cadastrado')
            return
        }

        let dataemissao = this.entrada.receberData('Digite a data de emissão do Passaporte: ')
        let passaporte = new Documento(numDoc, TipoDocumento.Passaporte, dataemissao)
        this.cliente.Documentos.push(passaporte)

    }
}