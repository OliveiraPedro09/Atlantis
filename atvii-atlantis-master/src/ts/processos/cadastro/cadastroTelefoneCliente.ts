import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";
import verificarTelefone from "../verificacao/verificarTelefone";

export default class CadastroTelefoneCliente extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.log(`****************************`)
        console.log(' Cadastro de Telefones')
        console.log(`****************************`)
        while (true){
            let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
            let numero = this.entrada.receberTexto('Qual o numero de telefone?')
            let telefoneExistente = verificarTelefone(armazem.Clientes, ddd, numero)[0]
            if(telefoneExistente){
                console.log('Telefone já regitrado no sistema.')
                continue
            }
            let telefone = new Telefone(ddd, numero)
            this.cliente.Telefones.push(telefone)
            let continuar = this.entrada.receberTexto('Deseja adicionar mais um telefone? (S/N)').toLowerCase()
            if(continuar === 'n'){
                break
            }
        }
        if(this.cliente.Dependentes.length > 0){
            this.atualizaTelefoneDependentes(this.cliente.Dependentes,this.cliente)
        }
        console.log(`****************************`)
        console.log('Finalizando registro')
        console.log(`****************************`)
    }
    private atualizaTelefoneDependentes(dependentes: Cliente[], titular: Cliente) {
        console.log(`****************************`)
        console.log('  Mudando Telefones de Dependentes')
        console.log(`****************************`)
        for (const dependente of dependentes) {
            dependente.setTelefone(titular.Telefones.map(tel => tel.clonar() as Telefone))
        }
    }
}