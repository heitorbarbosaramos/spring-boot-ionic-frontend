import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua quinze de novembro",
        numero: "300",
        complemento: "apto 300",
        bairro: "Santa Monica",
        cep:"48293822",
        cidade:{
          id:"1",
          nome: "Uberlândia",
          estado:{
            id:"1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua quinze de novembro",
        numero: "300",
        complemento: "apto 300",
        bairro: "Santa Monica",
        cep:"48293822",
        cidade:{
          id:"1",
          nome: "Uberlândia",
          estado:{
            id:"1",
            nome: "Minas Gerais"
          }
        }
      }
    ]
  }

}
