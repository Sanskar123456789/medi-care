import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdServiceService, Product } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'medi-care-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  constructor(private products:ProdServiceService,
              private routes:ActivatedRoute) {}

  endsub$ :Subject<any> = new Subject();
  Prods : Product[]=[];
  CopyProds : Product[]=[];
  id=0;
  searchModel=false;
  searchString="";
  ngOnInit(): void {
    this._getProducts();
    this._checkId();
  }

  private _checkId(){
    this.routes.params.subscribe(params=>{
      if(params['id']){
        this.searchModel = true;
        this.id = params["id"];
      }
    })
  }
  private _getProducts(){
    this.products.getProducts().pipe(takeUntil(this.endsub$)).subscribe(products =>{
      this.Prods = products;
      this.CopyProds = products;
    })
  }

  search(){
    this.CopyProds=[];
    this.Prods.forEach(item=>{
      if(item.prod_name?.toLowerCase().includes(this.searchString.toLowerCase())){
        this.CopyProds.push(item);
      }
    })
  }
}
