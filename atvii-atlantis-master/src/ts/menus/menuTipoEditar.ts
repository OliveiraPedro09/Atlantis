import Menu from "../interfaces/menu";

export default class MenuTipoEditar implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo do documento para editar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Cliente `)
        console.log(`| 2 - Dependente `)
        console.log(`| 3 - Documento `)
        console.log(`| 4 - Endereço `)
        console.log(`| 5 - Telefone `)
        console.log(`| 0 - Finalizar ação`)
        console.log(`----------------------`)
    }
}