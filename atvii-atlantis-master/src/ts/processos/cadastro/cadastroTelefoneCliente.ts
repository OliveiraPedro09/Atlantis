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
        while(true){
            console.log('Iniciando o cadastro de telefone...')
            let ddd = this.entrada.receberNumero('Qual o DDD?')
            let numero = this.entrada.receberNumero('Qual o número?')
            let telefone = new Telefone(ddd.toString(), numero.toString())
            
            if(verificarTelefone(armazem.Clientes, telefone.Numero)){
                console.log('Telefone já cadastrado no site')
                return
            }

            this.cliente.Telefones.push(telefone)

            let resposta = this.entrada.receberTexto('Deseja cadastrar outro telefone? (S/N)').toUpperCase()
            if (resposta.toLowerCase() === 'n') {
                console.log('Finalizando o cadastro de telefone...')
                break
            }
        }
    }
}