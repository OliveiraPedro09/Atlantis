import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";

export default function AttEnderecoDependente(dependentes: Cliente[], titular: Cliente){
    for(const dependente of dependentes){
        dependente.setEndereco(titular.Endereco.clonar() as Endereco)
    }
}