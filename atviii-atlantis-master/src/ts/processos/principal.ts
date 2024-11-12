import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import ListagemAcomodacoes from "./listagem/listagemAcomodacoes"
import ConfigurarCliente from "./tipo/tipoConfigurarCliente"
import TipoConfigurarHospedagem from "./tipo/tipoConfigurarHospedagem"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ConfigurarCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new TipoConfigurarHospedagem()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}