import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdTypeService, prod_type } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'medi-care-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit,OnDestroy {
  constructor(private productTypesService: ProdTypeService,
              private Router: Router) {}

  endsub$:Subject<any> = new Subject();
  ProductsType:prod_type[]=[];

  ngOnInit(): void {
    this._getProdType();
  }

  ngOnDestroy(){
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _getProdType(){
    this.productTypesService.getProducts().pipe(takeUntil(this.endsub$)).subscribe(products =>{
      this.ProductsType= products;
    })
  }

  toProduct(id: number|undefined){
    console.log(id);
    this.Router.navigateByUrl( `Products/${id}`);
  }
}
