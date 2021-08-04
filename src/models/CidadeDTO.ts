import { EstadoDTO } from "./EstadoDTO";

export interface CidadeDTO{
    id : string;
    nome : string;
    estado?: EstadoDTO;
}