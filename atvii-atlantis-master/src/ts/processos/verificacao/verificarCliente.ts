import Cliente from "../../modelos/cliente";

export default function verificarCliente(clientes: Cliente[], numero: string): Cliente | undefined{
    for (const cliente of clientes) {
            for ( const documento of cliente.Documentos ) {
                if ( documento.Numero === numero ) {
                    return cliente
                }
            }
        }
    return undefined
}