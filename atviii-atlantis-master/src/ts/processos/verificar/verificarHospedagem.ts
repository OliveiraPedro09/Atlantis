import Cliente from "../../modelos/cliente";
import Hospedagem from "../../modelos/hospedagem";

export default function verificarHospedagem( hospedagens: Hospedagem[], cliente: Cliente, dataInicial: Date, dataFinal: Date): Hospedagem | null {
    for (let hospedagem of hospedagens) {
        if (hospedagem.Cliente === cliente && hospedagem.DataInicio.toLocaleDateString() === dataInicial.toLocaleDateString() && hospedagem.DataFim.toLocaleDateString() === dataFinal.toLocaleDateString()) {
            return hospedagem
        }
    }
    return null;
}