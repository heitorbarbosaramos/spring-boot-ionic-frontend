import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService{

    constructor(public storage : StorageService){
    }

    createOrCleanCart() : Cart {

        let cart: Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;

    }

    getCart() : Cart{
        let cart : Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrCleanCart();
        } 
        return cart;
    }

    addProduto(produto : ProdutoDTO){
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.itens.push({quantidade: 1, produto});
        }
        this.storage.setCart(cart);
        console.log("ADDCIONANDO ITEM " + produto.nome);
        return cart;
    }

    removeProduto(produto : ProdutoDTO){
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens.splice(position, 1);
        }
        console.log("REMOVENDO PRODUTO " + produto.nome);
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto : ProdutoDTO){
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto : ProdutoDTO){
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens[position].quantidade--;
            if(cart.itens[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        console.log("REOVENDO ITEM QUANTIDADE " + produto.nome);
        this.storage.setCart(cart);
        return cart;
    }

    total() : number{
        let cart = this.getCart();
        let sum = 0;
        for(var i=0; i < cart.itens.length; i++){
            sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
        }
        console.log("SOMA TOTAL " + sum);
        return sum;
    }
}