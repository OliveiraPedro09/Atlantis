import Processo from "../../abstracoes/processo";
import ImpressorEndereco from "../../impressores/impressorEndereco";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import AttEnderecoDependente from "../atualizar/atualizarEnderecoDependente";

export default class EditarEndereco extends Processo {
    private cliente: Cliente
    private impressor!: Impressor

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        
        console.log('Editar Cliente')

        let enderecoAtual = this.cliente.Endereco

        this.impressor = new ImpressorEndereco(enderecoAtual)
        console.log(this.impressor.imprimir())

        let novaRua = this.entrada.receberTexto('Digite a nova rua: ')
        if(novaRua){
            enderecoAtual.setRua(novaRua)
        }
        let novoBairro = this.entrada.receberTexto('Digite o novo bairro: ')
        if(novoBairro){
            enderecoAtual.setBairro(novoBairro)
        }
        let novaCidade = this.entrada.receberTexto('Digite a nova cidade: ')
        if(novaCidade){
            enderecoAtual.setCidade(novaCidade)
        }
        let novoEstado = this.entrada.receberTexto('Digite o novo estado: ')
        if(novoEstado){
            enderecoAtual.setEstado(novoEstado)
        }
        let novoCep = this.entrada.receberTexto('Digite o novo CEP: ')
        if(novoCep){
            enderecoAtual.setCodigoPostal(novoCep)
        }


        if(this.cliente.Dependentes.length > 0){
            AttEnderecoDependente(this.cliente.Dependentes, this.cliente)
        }

        console.log('Endereço editado com sucesso.')

    }
}