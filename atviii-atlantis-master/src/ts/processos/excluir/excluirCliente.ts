import verificarCliente from "../verificar/verificarCliente";
import Cliente from "../../modelos/cliente";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import verificarTitular from "../verificar/verificarTitular";

export default class ExcluirCliente extends Processo{
    private armazem: Armazem;

    private excluirDependentes(dependentes: Cliente[]){
        for (let dependente of dependentes){
            const index = this.armazem.Clientes.indexOf(dependente)
            if (index !== -1 ){
                this.armazem.Clientes.splice(index, 1)
            }
        }
    }

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log("Excluindo cliente...")

        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)
        if(!cliente){
            console.log("Não encontrado.")
            return
        }

        let titular = verificarTitular(cliente)
        if(titular){
            console.log("Cliente é titular de outro cliente.")
            return
        }

        let excluindo = this.entrada.receberTexto("Tem certeza que deseja excluir o cliente? (s/n): ")

        const index = this.armazem.Clientes.indexOf(cliente)
        if( index === -1 ){
            console.log("Cliente não encontrado.")
            return
        }

        if(cliente.Dependentes.length > 0){
            this.excluirDependentes(cliente.Dependentes)
        }
        this.armazem.Clientes.splice(index, 1)
        console.log("Cliente excluído com sucesso.")
    }
}