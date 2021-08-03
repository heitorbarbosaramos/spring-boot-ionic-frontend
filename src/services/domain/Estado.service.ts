import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.cong";
import { EstadoDTO } from "../../models/EstadoDTO";


@Injectable()
export class EstadoService{
    
    constructor(public http: HttpClient){

    }

    findAll(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);

    }
}