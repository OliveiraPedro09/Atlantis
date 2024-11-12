import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaoCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import verificarCliente from "../verificar/verificarCliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.log('Listagem de Dependentes')

        let numDoc = this.entrada.receberTexto('Digite o número do documento do titular: ')
        let titular = verificarCliente(this.clientes, numDoc)
        if(!titular){
            console.log('Titular não encontrado.')
            return
        }

        if(titular.Dependentes.length === 0){
            console.log('Titular não possui dependentes cadastrados.')
            return
        }

        console.log(`Dependentes ${titular.Nome.toLocaleUpperCase()}:`)

        titular.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaoCliente(dependente)
            console.log(this.impressor.imprimir())
        })

        console.log('Fim da listagem.')
    }
}