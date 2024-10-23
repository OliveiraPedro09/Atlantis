import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";
import ImpressorEndereco from "./impressorEndereco";

export default class ImpressorEnderecos implements Impressor{
    private enderecos: Endereco[]
    private impressor!: Impressor

    constructor(enderecos: Endereco[]){
        this.enderecos = enderecos
    }

    imprimir(): string {
        let impressao = ``
        for (let index = 0; index < this.enderecos.length; index++) {
            this.impressor = new ImpressorEndereco(this.enderecos[index])
            if (index == 0) {
                impressao = impressao + `${this.impressor.imprimir()}`
            } else {
                impressao = impressao + `\n${this.impressor.imprimir()}`
            }

        }
        return impressao
    }
}
