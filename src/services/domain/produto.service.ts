import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.cong";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findById(produto_id : string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategorias(categoria_id : string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    getSmallImagefromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/produtos/prod${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    getImagefromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/produtos/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}