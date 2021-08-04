import { CidadeDTO } from "./CidadeDTO";

export interface EnderecoDTO{
    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: CidadeDTO;
}