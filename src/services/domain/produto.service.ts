import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.cong";

@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findByCategorias(categoria_id : string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    getSmallImagefromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/produtos/prod${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}