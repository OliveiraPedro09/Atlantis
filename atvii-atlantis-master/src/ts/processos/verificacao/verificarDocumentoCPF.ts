import Cliente from "../../modelos/cliente"
import Documento from "../../modelos/documento"
import { TipoDocumento } from "../../enumeracoes/TipoDocumento"

export default function verificarDocumentoCPF(clientes: Cliente [], numero: string ):[ boolean, Documento | null] {
    for ( const cliente of clientes ) {
        const documento = cliente.Documentos.find( doc => doc.Numero === numero && doc.Tipo === TipoDocumento.CPF )
        if ( documento ) {
            return [ true, documento ]
        }
    }
    return [ false, null ]
}