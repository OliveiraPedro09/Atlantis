import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorHospedagem from "../../impressores/impressorHospedagem";
import Hospedagem from "../../modelos/hospedagem";
import ListHosp from "../function/listHosp";
import verificarCliente from "../verificar/verificarCliente";

export default class ListagemHospedagem extends Processo {
    private armazem: Armazem;
    private impressor!: ImpressorHospedagem;

    constructor() {
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log('Listagem de Hospedagens')

        let numDoc = this.entrada.receberTexto('Digite o número do documento do titular: ')

        let titular = verificarCliente(this.armazem.Clientes, numDoc)
        if (!titular) {
            console.log('Cliente não encontrado.')
            return
        }

        let hospedagens = this.armazem.Hospedagem.filter( hospedagem => hospedagem.Cliente === titular)

        if(hospedagens.length === 0){
            console.log('Nenhuma hospedagem encontrada.')
            return
        }

        ListHosp(hospedagens)
        console.log('Fim da Listagem ')
    }
}