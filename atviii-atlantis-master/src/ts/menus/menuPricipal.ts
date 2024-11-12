import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
        console.log(`*************************************************`)
        console.log(`| Por favor, selecione uma opção!!!`)
        console.log(`_________________________________________________`)
        console.log(`| 1 - Gerênciamento de Clientes`)
        console.log(`| 2 - Gerênciamento de Hospedagem`) 
        console.log(`_________________________________________________`)
        console.log(`| 0 - Sair`)
        console.log(`*************************************************`)
    }
}