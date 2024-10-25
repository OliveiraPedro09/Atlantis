import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default function verificarTelefone(clientes: Cliente[], numero: string): [boolean, Telefone | null] {
    for (const cliente of clientes) {
        const telefone = cliente.Telefones.find(tel => tel.Numero === numero)
        if (telefone) {
            return [true, telefone]
        }
    }
    return [false, null]
}