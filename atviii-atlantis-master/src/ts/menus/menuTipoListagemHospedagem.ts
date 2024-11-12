import Menu from "../interfaces/menu";

export default class MenuTipoListagemHospedagem implements Menu {
    mostrar(): void {
        console.log(`*************************************************`)
        console.log(`| Qual o tipo de listagem desejada? `)
        console.log(`_________________________________________________`)
        console.log(`| 1 - Todas acomodações`)
        console.log(`| 2 - Hospedagens por cliente`)
        console.log(`_________________________________________________`)
    }
}