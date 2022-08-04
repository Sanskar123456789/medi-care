import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdTypeService } from '@medi-care/lib';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { prod_type } from 'libs/lib/src/lib/Models/Prod_type';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'medi-care-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss'],
})
export class ProductTypeComponent implements OnInit,OnDestroy {
  constructor(private prodtService:ProdTypeService,
              private messageService:MessageService,
              private router:Router
             ) {}

  Prod_type : prod_type[]=[];
  endsub$:Subject<any> = new Subject();
  ngOnDestroy(): void{
    this.endsub$.next;
    this.endsub$.complete();
  }
  ngOnInit(): void {
    this._getProdType();
  }

  private _getProdType(){
    this.prodtService.getProducts().pipe(takeUntil(this.endsub$)).subscribe(data => {
      this.Prod_type = data;
    })
  }

  delete(id:number){
    this.prodtService.deleteProd(id).pipe(takeUntil(this.endsub$)).subscribe(data => {
      if(data){
        if(data){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Deleted Successfully'});
          this._getProdType();
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Not Deleted'});
        }
        this._getProdType();
      }
    })
  }
  edit(id:number){
    this.router.navigateByUrl(`ProductsType/${id}`);
  }
}
