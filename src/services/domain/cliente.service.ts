import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.cong";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http:HttpClient, public storage: StorageService){
    }

    findByEmail(email: String) : Observable<ClienteDTO>{       
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/cliente/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/profiles/perfil${id}.png`;
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/cliente`,obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}
