import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@medi-care/lib';

@Component({
  selector: 'medi-care-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.scss'],
})
export class ProductTemplateComponent implements OnInit {
  @Input() product: Product={};
  
  constructor() {}

  ngOnInit(): void {}

  addtoCart(id:number|undefined){
    const cart = localStorage.getItem('Cart');
    const cartItem = [];
    if(cart==null){
      cartItem.push(id);
      localStorage.setItem('Cart', JSON.stringify(cartItem));
    }
    else{
      const existCart = JSON.parse(cart);
      if(existCart.includes(id)){
        localStorage.setItem('Cart', JSON.stringify(existCart));
      }else{
        existCart.push(id);
        localStorage.setItem('Cart', JSON.stringify(existCart));
      }
    }

  }
}
