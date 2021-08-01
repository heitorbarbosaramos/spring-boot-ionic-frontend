import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptors implements HttpInterceptor {
    
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
            return Observable.throw(errorObj);  
        })as any;
    }
}
export const ErrorInterceptProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptors,
    multi: true,
};