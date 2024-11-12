import Hospedagem from "../../modelos/hospedagem";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { NomeAcomadacao } from "../../enumeracoes/NomeAcomadacao";
import Impressor from "../../interfaces/impressor";
import verificarCliente from "../verificar/verificarCliente";
import verificarHospedagem from "../verificar/verificarHospedagem";
import verificarTitular from "../verificar/verificarTitular";
import { differenceInDays } from 'date-fns';
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao";


export default class CadastroHospedagem extends Processo {
    private armazem: Armazem;
    private impressor!: Impressor;

    constructor() {
        super();
        this.armazem = Armazem.InstanciaUnica;
    }

    processar(): void {
       console.log('Cadastro de Hospedagem');

        let numeroDoc = this.entrada.receberTexto('Digite o numero do documento do cliente:').trim();
        let cliente = verificarCliente(this.armazem.Clientes, numeroDoc);

        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }

        let clienteTitular = verificarTitular(cliente);

        if (clienteTitular) {
            console.log('Cliente já é titular de uma hospedagem.');
            return;
        }

        this.armazem.Acomodacoes.forEach((acomodacao, index) => {
            this.impressor = new ImpressorAcomodacao(acomodacao);
            console.log(`${index + 1}. ${this.impressor.imprimir()}`);
           console.log('---------------------------------------------------');
        });
        

        let nomeHospedagem: NomeAcomadacao;
        let acomodacao = this.entrada.receberNumero('Digite o número da acomodação você deseja :');
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
        
        const acomodacaoSelecionada = this.armazem.Acomodacoes[acomodacao - 1]; 
        if (Number(acomodacaoSelecionada.QuantidadeDisponivel) < 1) {
            console.log('Acomodação indisponível.');
            return;
        }

        let dataInicial = this.entrada.receberData('Digite a data inicial da reserva');
        let dataFinal = this.entrada.receberData('Digite a data final da hospedagem')

        const diasReservados = differenceInDays(dataFinal, dataInicial);
        if (diasReservados <= 0) {
            console.log('A data final deve ser depois da data inicial.');
            return;
        }

        let hospedagem = new Hospedagem(nomeHospedagem, cliente, dataInicial, dataFinal)

        let hospedagemExistente= verificarHospedagem(this.armazem.Hospedagem,hospedagem.Cliente,hospedagem.DataInicio, hospedagem.DataFim)

        if(hospedagemExistente){
            console.log('Já existe uma reserva para este cliente neste período.');
        }

        acomodacaoSelecionada.setQuantidadeDisponivel(Number(acomodacaoSelecionada.QuantidadeDisponivel) - 1)
        this.armazem.Hospedagem.push(hospedagem)
        console.log('Cadastro de hospedagem realizado com sucesso.');
    }
}