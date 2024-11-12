import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import verificarTelefone from "../verificar/verificarTelefone";
import AttTelefoneDependente from "../atualizar/atualizarTelefoneDependente";
import Impressor from "../../interfaces/impressor";
import ImpressorTelefones from "../../impressores/impressorTelefones";

export default class EditarTelefone extends Processo {
    private armazem: Armazem;
    private cliente: Cliente;
    private impressor!: Impressor;	

    constructor( cliente: Cliente) {
        super();
        this.armazem = Armazem.InstanciaUnica
        this.cliente = cliente;
        this.execucao = true
    }

    processar(): void {
        console.log('Editar Telefone')

        let telefoneAtual = this.cliente.Telefones
        
        if(telefoneAtual.length === 0 ){
            console.log('Cliente não possui telefones cadastrados.')
            return
        }

        this.impressor = new ImpressorTelefones(telefoneAtual)
        console.log(this.impressor.imprimir())

        let ddd = this.entrada.receberTexto('Digite o DDD do telefone que deseja editar: ')
        let numero = this.entrada.receberTexto('Digite o número do telefone que deseja editar: ')
        let Atualtelefone = verificarTelefone(this.armazem.Clientes, ddd, numero)[1]

        if(!Atualtelefone){
            console.log('Telefone não encontrado.')
            return
        }

        let indexTelefone = telefoneAtual.indexOf(Atualtelefone)
        if(indexTelefone === -1){
            console.log('Telefone não encontrado.')
            return
        }

        let novoddd = this.entrada.receberTexto('Digite o novo DDD do telefone: ')
        let novoNumTel = this.entrada.receberTexto('Digite o novo número do telefone: ')
        let telefoneEncontrado = verificarTelefone(this.armazem.Clientes, novoddd, novoNumTel)[1]

        if(telefoneEncontrado){
            console.log('Telefone já cadastrado.')
            return
        }

        telefoneAtual[indexTelefone].setDdd(novoddd)
        telefoneAtual[indexTelefone].setNumero(novoNumTel)

        if(this.cliente.Dependentes.length > 0){
            AttTelefoneDependente(this.cliente.Dependentes, this.cliente)
        }

        console.log('Telefone editado com sucesso.')
    }
}