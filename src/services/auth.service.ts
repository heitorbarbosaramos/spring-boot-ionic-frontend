import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.cong";
import { credenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){
    }

    authenticate(creds : credenciaisDTO){
        
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe:'response', responseType:'text'})
    }

    successfullLogin(authorization: string){
        let tok = authorization.substring(7);
        let user: LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}