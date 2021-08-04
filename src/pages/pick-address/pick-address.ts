import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response =>{
            this.items = response['enderecos'];
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

}
