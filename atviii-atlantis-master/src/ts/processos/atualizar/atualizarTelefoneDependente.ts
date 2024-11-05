import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default function AttTelefoneDependente( dependetes: Cliente[], titular: Cliente) {
    for(const dependente of dependetes){
        dependente.setTelefones(titular.Telefones.map(tel => tel.clonar() as Telefone))
    }
}