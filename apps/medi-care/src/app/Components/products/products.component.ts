import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdServiceService,Product } from '@medi-care/lib';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'medi-care-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private prodService:ProdServiceService,
              private messageService:MessageService,
              private routes:Router,
              private location:Location) {}

  endsub$ :Subject<any> = new Subject();
  prods:Product[] = [];
  ngOnDestroy() {
    this.endsub$.next;
    this.endsub$.complete();
  }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.prodService.getProducts().pipe(takeUntil(this.endsub$)).subscribe(data=>{
      this.prods=data;
    })
  }

  edit(id:number){
    this.routes.navigateByUrl(`/Products/${id}`)
  }
  
  deleteProd(id:number){
    this.prodService.deleteProd(id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      if(data){
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Deleted Successfully'});
        this._getProducts();
       
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Not deleted'});
        // timer(1000).toPromise().then(()=>{
        //   this.location.back();
        // })
      }
    })
  }

}
