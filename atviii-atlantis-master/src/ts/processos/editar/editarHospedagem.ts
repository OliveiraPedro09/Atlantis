import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorHospedagem from "../../impressores/impressorHospedagem";
import Impressor from "../../interfaces/impressor";
import verificarCliente from "../verificar/verificarCliente";
import verificarHospedagem from "../verificar/verificarHospedagem";
import Hospedagem from "../../modelos/hospedagem";
import EditarAcomodacao from "./editarAcomodacao";


export default class EditarHospedagem extends Processo {
    private armazem: Armazem;
    private impressor!: Impressor
    constructor() {
        super();
        this.armazem = Armazem.InstanciaUnica;
    }

    processar(): void {
        
        console.log('Editar Hospedagem');

        let numeroDoc = this.entrada.receberTexto('Digite o numero do documento do cliente:').trim();
        let cliente = verificarCliente(this.armazem.Clientes, numeroDoc);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        
        let dataInicial = this.entrada.receberData('Digite a data inicial da hospedagem')
        let dataFinal = this.entrada.receberData('Digite a data final da hospedagem')

        let hospedagem= verificarHospedagem(this.armazem.Hospedagem,cliente,dataInicial, dataFinal)
        
        if (!hospedagem){
            console.log('Hospedagem não encontrada.')
            return
        }
        
        this.impressor = new ImpressorHospedagem(hospedagem)
        console.log(this.impressor.imprimir())
        console.log(`Opções de edição:`)
        console.log(`1 - Editar Tipo de Acomodação`)
        console.log(`2 - Editar Data de Inicio`)
        console.log(`3 - Editar Data Final`)
        console.log(`4 - Voltar ao Menu Principal `)


        let opcao = this.entrada.receberNumero('Digite a opção desejada:')
        switch(opcao){
            case 1:
                this.editaTipoAcomodacao(hospedagem)
                break
            case 2:
                this.editaDataInical(hospedagem)
                break
            case 3:
                this.editaDataFinal(hospedagem)
                break
            case 4:
                console.log('Finalizando edição de hospedagem')
                break
            default:
                console.log('Opção não entendida')
        }
        console.log('---------------------------------------------------');
        console.log('           HOSPEDAGEM ATUALIZADA');
        console.log('---------------------------------------------------');
    }

    private editaTipoAcomodacao(hospedagem: Hospedagem){
        this.processo = new EditarAcomodacao(hospedagem)
        this.processo.processar()
    }

    private editaDataInical(hospedagem: Hospedagem){
        let data = this.entrada.receberData('Digite a data inicial da hospedagem')
        if(data && !isNaN(data.getTime()) && data < hospedagem.DataFim){
           hospedagem.setDataInicio(data) 
        }else {
            console.log('Data inválida ou anterior à data final.');
            return
        }
    }

    private editaDataFinal(hospedagem: Hospedagem){
        let data = this.entrada.receberData('Digite a data final da hospedagem')
        if(data && !isNaN(data.getTime()) && hospedagem.DataInicio> data){
           hospedagem.setDataFim(data) 
        }else {
            console.log('Data inválida ou anterior à data inicial.')
            return
        }
    }
}