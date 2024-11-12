import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import verificarCliente from "../verificar/verificarCliente";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import CadastroDocumentosCliente from "../tipo/tipoCadastroDocumentosCliente";


export default class CadastroDependente extends Processo {
    processar(): void {
        console.log('Cadastro de Dependente')
        let docCliente = this.entrada.receberTexto('Digite o documento do cliente: ')
        let armazem = Armazem.InstanciaUnica

        const cliente = verificarCliente(armazem.Clientes, docCliente)

        if(cliente == null){
            console.log('Cliente não encontrado.')
            return
        }

        while(true){
            let nome = this.entrada.receberTexto('Digite o nome do dependente: ')
            let nomeSocial = this.entrada.receberTexto('Digite o nome social do dependente: ')
            let dataNascimento = this.entrada.receberData('Digite a data de nascimento do dependente: ')
            let dependente = new Cliente(nome, nomeSocial, dataNascimento)

            dependente.setEndereco(cliente.Endereco.clonar() as Endereco)
            dependente.setTelefones(cliente.Telefones.map(telefone => telefone.clonar() as Telefone))
            dependente.setTitular(cliente)

            this.processo = new CadastroDocumentosCliente(dependente)
            this.processo.processar()

            cliente.Dependentes.push(dependente)
            armazem.Clientes.push(dependente)

            let continuar = this.entrada.receberTexto('Deseja cadastrar outro dependente? (s/n): ')

            if (continuar.toLowerCase() == 'n') {
                break
            }
        }
        console.log('Dependentes cadastrados com sucesso.')
    }
}
