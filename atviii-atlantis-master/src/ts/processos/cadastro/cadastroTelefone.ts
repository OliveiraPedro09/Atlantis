import Processo from "../../abstracoes/processo";
import Telefone from "../../modelos/telefone";
import Cliente from "../../modelos/cliente";
import verificarTelefone from "../verificar/verificarTelefone";
import Armazem from "../../dominio/armazem";
import AttTelefoneDependente from "../atualizar/atualizarTelefoneDependente";


export default class CadastrarTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        
        console.log('Cadastro de Telefone')

        while(true){
            let ddd = this.entrada.receberTexto('Digite o DDD do telefone: ')
            let numero = this.entrada.receberTexto('Digite o número do telefone: ')
            let acharTelefone = verificarTelefone(armazem.Clientes, ddd, numero)[0]

            if(acharTelefone != null){
                console.log('Telefone já cadastrado.')
                return
            }

            let telefone = new Telefone(ddd, numero)
            this.cliente.Telefones.push(telefone)

            let continuar = this.entrada.receberTexto('Deseja cadastrar outro telefone? (s/n): ')
            if (continuar.toLowerCase() == 'n') {
                break
            }
        }
        if(this.cliente.Dependentes.length > 0 ){
            AttTelefoneDependente(this.cliente.Dependentes, this.cliente)
        }
        console.log('Telefones cadastrados com sucesso.')
    }
}