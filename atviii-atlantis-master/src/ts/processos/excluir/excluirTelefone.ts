import Armazem from "../../dominio/armazem";
import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";
import verificarCliente from "../verificar/verificarCliente";
import verificarTelefone from "../verificar/verificarTelefone";
import AttTelefoneDependente from "../atualizar/atualizarTelefoneDependente";


export default class ExcluirTelefone extends Processo {
    private armazem: Armazem;

    constructor(){
        super();
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log("Excluindo telefone...")

        let numDoc = this.entrada.receberTexto("Digite o número do documento do cliente: ")
        let cliente = verificarCliente(this.armazem.Clientes, numDoc)

        if(!cliente){
            console.log("Não encontrado.")
            return
        }

        const telefone = cliente.Telefones

        if(telefone.length === 0){
            console.log("Cliente não possui telefones cadastrados.")
            return
        }

        let ddd = this.entrada.receberTexto("Digite o DDD do telefone: ")
        let numero = this.entrada.receberTexto("Digite o número do telefone: ")
        let telefoneEncontrado = verificarTelefone(this.armazem.Clientes, ddd, numero)[1]

        if(!telefoneEncontrado){
            console.log("Telefone não encontrado.")
            return
        }

        const index = cliente.Telefones.findIndex(telefone => telefone.Ddd === telefoneEncontrado.Ddd && telefone.Numero === telefoneEncontrado.Numero)

        if(index === -1){
            console.log("Telefone não encontrado.")
            return
        }

        cliente.Telefones.splice(index, 1)
        if(cliente.Dependentes.length > 0){
            AttTelefoneDependente(cliente.Dependentes, cliente)
        }

        console.log("Telefone excluído com sucesso.")
    }
}