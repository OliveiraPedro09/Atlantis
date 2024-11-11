import Documento from "../../modelos/documento";
import Cliente from "../../modelos/cliente";

export default function verificarDocumento(clientes: Cliente[], numero: string): [boolean, Documento | null] {
    for (let cliente of clientes) {
        let documentoEncontrado = cliente.Documentos.find(documento => documento.Numero == numero)
        if (documentoEncontrado) {
            return [true, documentoEncontrado]
        }
    }
    return [false, null]
}