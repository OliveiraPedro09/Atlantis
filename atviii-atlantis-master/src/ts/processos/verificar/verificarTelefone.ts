import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default function verificarTelefone(clientes: Cliente[], ddd: string, numero: string): [boolean, Telefone | null] {
    for (let cliente of clientes) {
        let telefoneEncontrado = cliente.Telefones.find(telefone => telefone.Ddd === ddd && telefone.Numero === numero)
        if (telefoneEncontrado) {
            return [true, telefoneEncontrado]
        }
    }
    return [false, null]
}