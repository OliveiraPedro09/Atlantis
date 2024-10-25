import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import verificarDocumentoRg from "../verificacao/verificarDocumentoRG";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao)

        if (verificarDocumentoRg([this.cliente], numero)[0]) {
            console.log('Documento já foi cadastrado no site')
            return
        }

        this.cliente.Documentos.push(rg)
    }
}