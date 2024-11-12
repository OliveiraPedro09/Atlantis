import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Impressor from "../../interfaces/impressor";
import ImpressaoCliente from "../../impressores/impressorCliente";

export default class ListagemTitular extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == undefined) {
            verificacao = true
        }
        return verificacao
    }

    constructor(){
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        
        console.log('Listagem de Titulares')

        this.clientes.forEach(cliente => {
            if (this.titular(cliente)) {
                this.impressor = new ImpressaoCliente(cliente)
                console.log(this.impressor.imprimir())
            }
        })
    
    }

}