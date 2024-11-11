import Cliente from "../../modelos/cliente";
import verificarCliente from "../verificar/verificarCliente";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import verificarTitular from "../verificar/verificarTitular";


export default class ExcluirDependente extends Processo {
    private armazem: Armazem;

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log("Excluindo dependente...")

        let numDoc = this.entrada.receberTexto("Digite o número do documento do dependente: ")
        let dependente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!dependente){
            console.log("Não encontrado.")
            return
        }

        let titular = dependente.Titular as Cliente 
        let index = titular.Dependentes.findIndex(dep => dep === dependente)

        if (index === -1) {
            console.log("Dependente não encontrado.")
            return
        }   

        const indexdep = this.armazem.Clientes.indexOf(dependente)
        if (indexdep === -1) {
            console.log("Dependente não encontrado.")
            return
        }

        titular.Dependentes.slice(index, 1)

        this.armazem.Clientes.splice(indexdep, 1)

        console.log("Dependente excluído com sucesso.")

    }
}