import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.cong';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response =>{
            this.cliente = response as ClienteDTO;
            this.getImagesExist();
          },
          error=>{
            if(error.satus == 403){
              console.log("ERROR 403 NÃO AUTORIZADO profile");
              this.navCtrl.setRoot('HomePage');
            }
          
          }) 
    }else{
      console.log("ERROR 403 NÃO AUTORIZADO profile");
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImagesExist(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response =>{
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/profiles/perfil${this.cliente.id}.png`;
    },
    error=>{})
  }

}
