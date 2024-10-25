import Documento from "../../modelos/documento";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default function verificarDocumentoRg(clientes: Cliente[], numero: string): [boolean, Documento | null] {
    for (const cliente of clientes) {
        const documento = cliente.Documentos.find(doc => doc.Numero === numero && doc.Tipo === TipoDocumento.RG)
        if (documento) {
            return [true, documento]
        }
    }
    return [false, null]
}