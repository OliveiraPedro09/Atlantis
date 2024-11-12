import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import MenuTipoConfigurarClientes from "../../menus/menuTipoConfigurarCliente";
import EditarCliente from "../editar/editarCliente";
import ListagemClienteUnico from "../listagem/listagemClienteUnico";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoExcluir from "./tipoExcluir";
import TipoListagemClientes from "./tipoListagemClientes";

export default class ConfigurarCliente extends Processo {

    constructor() {
        super()
        this.menu = new MenuTipoConfigurarClientes()
    }

    processar(): void {
        this.menu.mostrar()
        let opcao = this.entrada.receberNumero('Qual a opção desejada?')

        switch (opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new EditarCliente()
                this.processo.processar()
                break
            case 3:
                this.processo = new ListagemClienteUnico()
                this.processo.processar()
                break
            case 4:
                this.processo = new TipoExcluir()
                this.processo.processar()
                break
            case 5:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            default:
                console.log('Opção Inválida')
                return
        }
    }
}