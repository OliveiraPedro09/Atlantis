import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";
import Endereco from "../modelos/endereco";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem
    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }
    imprimir(): string {
        let impressao = ``
            + `| Cliente: ${this.hospedagem.Cliente.Nome} |`
            + `| Acomodação: ${this.hospedagem.Acomodacao} |`
            + `| Data Início: ${this.hospedagem.DataInicio} |`
            + `| Data Fim: ${this.hospedagem.DataFim} |`
        return impressao
    }
}