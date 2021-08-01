import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.cong";
import { credenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){
    }

    authenticate(creds : credenciaisDTO){
        
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe:'response', responseType:'text'})
    }
}