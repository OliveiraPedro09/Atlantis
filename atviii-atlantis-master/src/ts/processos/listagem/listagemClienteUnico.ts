import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaoCliente from "../../impressores/impressorCliente";
import Cliente from "../../modelos/cliente";
import verificarCliente from "../verificar/verificarCliente";
import Impressor from "../../interfaces/impressor";


export default class ListagemClienteUnico extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor(){
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.log("Listando cliente...")
        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.clientes, numDoc)

        if(!cliente){
            console.log("Cliente não encontrado.")
            return
        }

        this.impressor = new ImpressaoCliente(cliente)
        console.log(this.impressor.imprimir())
        console.log("Listagem concluída.")
    }
}
