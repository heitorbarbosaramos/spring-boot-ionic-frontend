import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptors implements HttpInterceptor {
    
    constructor(public storage : StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("PASSOU PELO INTERCEPTOR");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(errorObj.satus){
                errorObj = JSON.parse(errorObj);
            }

            console.log("ERROR DETECTADO PELO INTERCEPTOR");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(errorObj);  
        })as any;
    }


    handle403(){
        this.storage.setLocalUser(null);
        console.log("ERROR 403 NÃO AUTORIZADO");
        // this.navCtrl.setRoot('HomePage');
    }

}
export const ErrorInterceptProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptors,
    multi: true,
};