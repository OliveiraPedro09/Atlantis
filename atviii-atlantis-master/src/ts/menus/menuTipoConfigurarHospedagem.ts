import Menu from "../interfaces/menu";

export default class MenuTipoConfigurarHospedagem implements Menu {
    mostrar(): void {
        console.log(`*************************************************`)
        console.log(`| Escolha a opção que deseja:`)
        console.log(`_________________________________________________`)
        console.log(`| 1 - Registrar Reserva`)
        console.log(`| 2 - Editar Reserva`)
        console.log(`| 3 - Ver Reserva`)
        console.log(`| 4 - Excluir Reserva`)
        console.log(`| 5 - Listar Reservas`)
        console.log(`_________________________________________________`)
        console.log(`*************************************************`)
    }
}