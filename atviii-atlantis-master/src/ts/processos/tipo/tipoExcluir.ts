import Processo from "../../abstracoes/processo";
import MenuTipoExcluir from "../../menus/menuTipoExcluir";
import ExcluirCliente from "../excluir/excluirCliente";
import ExcluirDocumento from "../excluir/excluirDocumento";
import ExcluirTelefone from "../excluir/excluirTelefone";
import ExcluirDependente from "../excluir/excluirDependente";

export default class TipoExcluir extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoExcluir()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Escolha a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ExcluirCliente()
                this.processo.processar()
                break;
            case 2:
                this.processo = new ExcluirDependente()
                this.processo.processar()
                break
            case 3: 
                this.processo = new ExcluirDocumento()
                this.processo.processar()
                break
            case 4: 
                this.processo = new ExcluirTelefone()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}

