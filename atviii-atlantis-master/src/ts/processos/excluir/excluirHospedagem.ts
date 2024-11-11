import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import verificarCliente from "../verificar/verificarCliente";
import verificarHospedagem from "../verificar/verificarHospedagem";

export default class ExcluirHospedagem extends Processo {
    private armazem: Armazem;

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }


    processar(): void {
        console.log("Excluindo hospedagem...")
        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!cliente){
            console.log("Não encontrado.")
            return
        }

        let dataInicio = this.entrada.receberData("Digite a data de início da hospedagem: ")
        let dataFim = this.entrada.receberData("Digite a data de fim da hospedagem: ")

        let hospedagem = verificarHospedagem(this.armazem.Hospedagem, cliente, dataInicio, dataFim)
        if (!hospedagem) {
            console.log("Hospedagem não encontrada.")
            return
        }

        const index = this.armazem.Hospedagem.findIndex(hospedagem =>
            hospedagem.Cliente === hospedagem.Cliente &&
            hospedagem.Acomodacao === hospedagem.Acomodacao &&
            hospedagem.DataInicio === hospedagem.DataInicio &&
            hospedagem.DataFim === hospedagem.DataFim
        )

        if (index === -1) {
            console.log("Hospedagem não encontrada.")
            return
        }

        const indexAcomodacao = this.armazem.Acomodacoes.findIndex(acomodacao => 
            acomodacao.NomeAcomadacao === hospedagem.Acomodacao
        )

        if ( indexAcomodacao === -1) {
            console.log("Acomodação não encontrada.")
            return
        }

        const qntAtual = this.armazem.Acomodacoes[indexAcomodacao].QuantidadeDisponivel
        this.armazem.Acomodacoes[indexAcomodacao].setQuantidadeDisponivel(Number(qntAtual) + 1)

        this.armazem.Hospedagem.splice(index, 1)

        console.log("Hospedagem excluída com sucesso.")
    }
}