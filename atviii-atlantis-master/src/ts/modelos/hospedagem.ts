import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Cliente from "./cliente";

export default class Hospedagem {
    DataFinal(Hospedagem: Hospedagem[], Cliente: Cliente, DataInicio: Date, DataFinal: any) {
        throw new Error("Method not implemented.");
    }
    
    private acomodacao : NomeAcomadacao
    private cliente : Cliente
    private dataInicio : Date
    private dataFim : Date

    constructor(acomodacao : NomeAcomadacao, cliente : Cliente, dataInicio : Date, dataFim : Date){
        this.acomodacao = acomodacao
        this.cliente = cliente
        this.dataInicio = dataInicio
        this.dataFim = dataFim
    }

    public get Acomodacao(){
        return this.acomodacao
    }
    public get Cliente(){
        return this.cliente
    }
    public get DataInicio(){
        return this.dataInicio
    }   
    public get DataFim(){
        return this.dataFim
    }


    public setAcomodacao(acomodacao : NomeAcomadacao){
        this.acomodacao = acomodacao
    }
    public setCliente(cliente : Cliente){
        this.cliente = cliente
    }
    public setDataInicio(dataInicio : Date){
        this.dataInicio = dataInicio
    }
    public setDataFim(dataFim : Date){
        this.dataFim = dataFim
    }

}