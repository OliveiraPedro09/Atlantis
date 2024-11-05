import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import verificarDoc from "../verificacao/verificarDoc";
import Armazem from "../../dominio/armazem";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let documentoExistente = verificarDoc(armazem.Clientes, numero)
        if(documentoExistente){
            console.log('Documento já registrado')
            return
        }
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao)
        this.cliente.Documentos.push(rg)
    }
}