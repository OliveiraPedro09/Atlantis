import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";    
import ListagemHospedagem from "./listagemHospedagem";
import Impressor from "../../interfaces/impressor";
import verificarCliente from "../verificar/verificarCliente";
import ListHosp from "../function/listHosp";


export default class ListagemHospedagemCliente extends Processo{
    private armazem: Armazem;
    private impressor!: Impressor;

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log("Listando hospedagens do cliente...")

        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!cliente){
            console.log("Cliente não encontrado.")
            return
        }

        let hospedagem = this.armazem.Hospedagem.filter(hospedagem => hospedagem.Cliente === cliente)
        
        if(hospedagem.length === 0){
            console.log("Cliente não possui hospedagens.")
            return
        }

        ListHosp(hospedagem)
        console.log("Listagem concluída.")

    }
}