import Cliente from "../../modelos/cliente"

export default function verificarTitular(cliente: Cliente): boolean{
   if(cliente.Titular){
    return true
   }
   return false
}