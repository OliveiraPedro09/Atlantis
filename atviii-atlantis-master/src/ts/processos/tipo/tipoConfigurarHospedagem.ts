import Processo from "../../abstracoes/processo";
import MenuTipoConfigurarHospedagem from "../../menus/menuTipoConfigurarHospedagem";
import CadastroHospedagem from "../cadastro/cadastroHospedagem";
import EditarHospedagem from "../editar/editarHospedagem";
import ExcluirHospedagem from "../excluir/excluirHospedagem";
import ListagemHospedagem from "../listagem/listagemHospedagem";
import ListagemReservaUnica from "../listagem/listagemReservaUnica";

export default class TipoConfigurarHospedagem extends Processo {

    constructor(){
        super()
        this.menu = new MenuTipoConfigurarHospedagem()
    }

    processar(): void {
        this.menu.mostrar()

        let opcao = this.entrada.receberNumero('Digite a opção desejada: ')

        switch(opcao){
            case 1:
                this.processo = new CadastroHospedagem()
                this.processo.processar()
                break
            case 2:
                this.processo = new EditarHospedagem()
                this.processo.processar()
                break
            case 3:
                this.processo = new ListagemReservaUnica()
                this.processo.processar()
                break
            case 4:
                this.processo = new ExcluirHospedagem()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemHospedagem()
                this.processo.processar()
                break
        }
    }

}