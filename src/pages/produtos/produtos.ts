import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.cong';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {

    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategorias(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrl();
      },
      error=>{});
    }

    loadImageUrl(){
      for(var i=0; i < this.items.length; i++){
        let item = this.items[i];
        this.produtoService.getSmallImagefromBucket(item.id)
          .subscribe(response =>{
            item.imgUrl = `${API_CONFIG.bucketBaseUrl}/produtos/prod${item.id}-small.jpg`
          },
          error=>{});
      }
    }

    showDetails(){
      this.navCtrl.push('ProdutoDetailPage');
    }
}
