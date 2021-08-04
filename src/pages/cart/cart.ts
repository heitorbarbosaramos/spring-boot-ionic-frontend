import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.cong';
import { Cartitem } from '../../models/cart-item';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items : Cartitem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrl();
  }

  loadImageUrl(){
    for(var i=0; i < this.items.length; i++){
      let item = this.items[i];
     
      this.produtoService.getSmallImagefromBucket(item.produto.id)
        .subscribe(response =>{
          
          item.produto.imgUrl = `${API_CONFIG.bucketBaseUrl}/produtos/prod${item.produto.id}-small.jpg`;
          console.log("---> " + item.produto.imgUrl);
        },
        error=>{});
    }
  }

  removeItem(produto : ProdutoDTO){
    this.cartService.removeProduto(produto).itens;
    this.ionViewDidLoad();
  }

  increaseItem(produto : ProdutoDTO){
    let cart =  this.cartService.increaseQuantity(produto).itens;
    this.ionViewDidLoad();
  }

  decreaseItem(produto : ProdutoDTO){
    this.cartService.decreaseQuantity(produto).itens;
    this.ionViewDidLoad();
  }

  total(){
   var quant = this.cartService.total();
   console.log(quant);
   return quant;
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.navCtrl.setRoot('PickAddressPage');
  }
}
