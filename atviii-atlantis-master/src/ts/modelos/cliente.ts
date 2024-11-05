import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente | null

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
    }

    public get Nome() { 
        return this.nome 
    }
    public get NomeSocial() { 
        return this.nomeSocial 
    }
    public get DataNascimento() { 
        return this.dataNascimento 
    }
    public get DataCadastro() { 
        return this.dataCadastro 
    }
    public get Telefones() { 
        return this.telefones 
    }
    public get Endereco() { 
        return this.endereco 
    }
    public get Documentos() { 
        return this.documentos 
    }
    public get Dependentes() { 
        return this.dependentes 
    }
    public get Titular() { 
        return this.titular 
    }


    public setNome(nome: string) { 
        this.nome = nome 
    }
    public setNomeSocial(nomeSocial: string) { 
        this.nomeSocial = nomeSocial 
    }
    public setDataNascimento(dataNascimento: Date) { 
        this.dataNascimento = dataNascimento 
    }
    public setDataCadastro(dataCadastro: Date) { 
        this.dataCadastro = dataCadastro 
    }
    public setTelefones(telefones: Telefone[]) { 
        this.telefones = telefones 
    }
    public setEndereco(endereco: Endereco) { 
        this.endereco = endereco 
    }
    public setDocumentos(documentos: Documento[]) { 
        this.documentos = documentos 
    }
    public setDependentes(dependentes: Cliente[]) { 
        this.dependentes = dependentes 
    }
    public setTitular(titular: Cliente | null) { 
        this.titular = titular 
    }
}