import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdTypeService } from '@medi-care/lib';
import {MessageService} from 'primeng/api';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { prod_type } from 'libs/lib/src/lib/Models/Prod_type';
import { Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'medi-care-product-type-new',
  templateUrl: './product-type-new.component.html',
  styleUrls: ['./product-type-new.component.scss'],
})
export class ProductTypeNewComponent implements OnInit,OnDestroy {
  constructor(private routes:Router,
              private prod_typeService:ProdTypeService,
              private messageService: MessageService,
              private location : Location,
              private router:ActivatedRoute
              ) {}

  typeName = "";
  editmode= false;
  id=null;
  endsub$:Subject<any> = new Subject();
  ngOnInit(): void {
    this._checkEditmode();
    if(this.editmode){
      this._getOneProdType();
    }
  }

  ngOnDestroy(): void{
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _getOneProdType(){
    if(this.id)
    this.prod_typeService.getProduct(this.id).pipe(takeUntil(this.endsub$)).subscribe(data=>{
      if(data.type_name)
      this.typeName = data.type_name;
    })
  }

  private _checkEditmode(){
    this.router.params.subscribe(params => {
      if(params['id']){
        this.editmode = true;
        this.id = params["id"];
      }
    })
  }

  submit(){
    if(this.id){
       const data : prod_type = {
        type_name:this.typeName,
        type_id:this.id
      };
      this._updatedata(data);
    }else{
       const data : prod_type = {
        type_name:this.typeName,
      };
      this._adddata(data);
    }
  }

  private _adddata(data:prod_type){
    this.prod_typeService.newProd(data).pipe(takeUntil(this.endsub$)).subscribe((data) =>{  
      if(data.type_id){
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Added Successfully'});
         timer(1000).toPromise().then(()=>{
          this.location.back();
        })
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Not Added'});
        timer(1000).toPromise().then(()=>{
          this.location.back();
        })
      }
    })

  }

  private _updatedata(data:prod_type){
    this.prod_typeService.updateProd(data).pipe(takeUntil(this.endsub$)).subscribe(data =>{
      if(data.type_id){
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Updated Successfully'});
         timer(1000).toPromise().then(()=>{
          this.location.back();
        })
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Not Updated'});
        timer(1000).toPromise().then(()=>{
          this.location.back();
        })
      }
    })
  }

  back(){
    this.routes.navigateByUrl('ProductsType');
  }
}
