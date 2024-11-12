import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Hospedagem from "../../modelos/hospedagem";
import Impressor from "../../interfaces/impressor";
import { NomeAcomadacao } from "../../enumeracoes/NomeAcomadacao";
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao";

export default class EditarAcomodacao extends Processo {
    private armazem: Armazem
    private impressor!: Impressor
    private hospedagem!: Hospedagem

    constructor(reserva: Hospedagem) {
        super()
        this.hospedagem = reserva
        this.execucao = true 
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        this.armazem.Acomodacoes.forEach((acomodacao, index) => {
            this.impressor = new ImpressorAcomodacao(acomodacao)
            console.log(`${index + 1}. ${this.impressor.imprimir()}`)
        })

        let nomeHospedagem: NomeAcomadacao
        let acomodacao = this.entrada.receberNumero('Digite o número da acomodação que deseja editar: ')

        switch (acomodacao) {
            case 1:
                nomeHospedagem = NomeAcomadacao.CasalSimples;
                break;
            case 2:
                nomeHospedagem = NomeAcomadacao.FamilaSimples;
                break;
            case 3:
                nomeHospedagem = NomeAcomadacao.FamiliaMais;
                break;
            case 4:
                nomeHospedagem = NomeAcomadacao.FamiliaSuper;
                break;
            case 5:
                nomeHospedagem = NomeAcomadacao.SolteiroSimples;
                break;
            case 6:
                nomeHospedagem = NomeAcomadacao.SolteiroMais;
                break;
            default:
                console.log('Opção inválida.');
                return;
        }

        const acomodacaoSelecionada = this.armazem.Acomodacoes[acomodacao - 1]
        if(Number(acomodacaoSelecionada.QuantidadeDisponivel) < 1){
            console.log('Acomodação indisponível.')
            return
        }
        this.hospedagem.setAcomodacao(nomeHospedagem)
    }
}