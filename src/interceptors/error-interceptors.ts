import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptors implements HttpInterceptor {
    
    constructor(public storage : StorageService, public alertCtrl : AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("PASSOU PELO INTERCEPTOR");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.satus){
                errorObj = JSON.parse(errorObj);
            }

            console.log("ERROR DETECTADO PELO INTERCEPTOR");
            console.log(errorObj);
            console.log("---> COD ERROR: " + errorObj.status)
            switch(errorObj.status){

                case 401:
                    console.log("ERRROU 401 BEM AQUI")
                    this.handle401();
                    break;

                case 403:
                this.handle403();
                break;

                default:
                    this.handleDefaultError(errorObj);
                    break;
            }

            return Observable.throw(errorObj);  
        })as any;
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorreto',
            enableBackdropDismiss:false,
            buttons:[
                {text: 'Ok'}
            ]
        });
        alert.present();
    }


    handle403(){
        this.storage.setLocalUser(null);
        console.log("ERROR 403 NÃO AUTORIZADO");
        // this.navCtrl.setRoot('HomePage');
    }

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ' : ' + errorObj.error ,
            message: errorObj.message,
            enableBackdropDismiss:false,
            buttons:[
                {text: 'Ok'}
            ]
        });
        alert.present();
    }

}
export const ErrorInterceptProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptors,
    multi: true,
};