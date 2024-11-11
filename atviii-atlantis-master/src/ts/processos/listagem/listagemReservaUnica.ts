import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Impressor from "../../interfaces/impressor";
import verificarCliente from "../verificar/verificarCliente";
import verificarHospedagem from "../verificar/verificarHospedagem";
import verificarTitular from "../verificar/verificarTitular";
import ImpressorHospedagem from "../../impressores/impressorHospedagem";


export default class ListagemReservaUnica extends Processo{
    private armazem: Armazem;
    private impressor!: Impressor;

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log("Listando reserva única...")

        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!cliente){
            console.log("Cliente não encontrado.")
            return
        }

        let ClienteTitular = verificarTitular(cliente)
        if(!ClienteTitular){
            console.log("Cliente é titular.")
            return
        }

        let dataInicio = this.entrada.receberData("Digite a data inicial da hospedagem: ")
        let dataFim = this.entrada.receberData("Digite a data final da hospedagem: ") 

        let hospedagem = verificarHospedagem(this.armazem.Hospedagem, cliente, dataInicio, dataFim)
        if(!hospedagem){
            console.log("Hospedagem não encontrada.")
            return
        }

        this.impressor = new ImpressorHospedagem(hospedagem)
        console.log("Listagem concluída.")
    }

}