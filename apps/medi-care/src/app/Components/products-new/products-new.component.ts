import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdServiceService, ProdTypeService, Product } from '@medi-care/lib';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { prod_type } from 'libs/lib/src/lib/Models/Prod_type';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'medi-care-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.scss'],
})
export class ProductsNewComponent implements OnInit,OnDestroy {
  constructor(private routes:Router,
              private formbuilder:FormBuilder,
              private prodtService:ProdTypeService,
              private prodService:ProdServiceService,
              private route:ActivatedRoute,
              private messageService: MessageService,
              private location : Location
              ) {}

  forms!: FormGroup;
  img:string | ArrayBuffer | any;
  Prod_type : prod_type[]=[];
  product:Product={};
  prod_name="";
  endsub$:Subject<any> = new Subject();
  editmode = false;
  id=null;
  typeName="";
  image_url="";
  cloud_id = "";
  ngOnDestroy(): void{
    this.endsub$.next;
    this.endsub$.complete();
  }

  ngOnInit(): void {
    this._formInit();
    this._getProdType();
    this._checkEditmode();
    if(this.editmode){
      this._getOneProd();
    }
  }

  back(){
    this.routes.navigateByUrl('Products');
  }

  private _checkEditmode() {
    this.route.params.subscribe(params => {
      if(params['id']){
        this.editmode = true;
        this.id = params["id"];
      }
    })
  }

  private _formInit(){
    this.forms = this.formbuilder.group({
      prod_name:['', Validators.required],
      price:[''],
      description:[''],
      image:[''],
      type:['', Validators.required],
    })
  }

  private _getProdType(){
    this.prodtService.getProducts().pipe(takeUntil(this.endsub$)).subscribe(data => {
      this.Prod_type = data;
    })
  }

  private _getOneProd(){
    if(this.id){
      this.prodService.getProduct(this.id).pipe(takeUntil(this.endsub$)).subscribe(data => {
        
        this.product=data;
        if(data.cloud_id)
        {this.cloud_id = data.cloud_id;}
        this.forms.controls['prod_name'].setValue(data.prod_name);
        this.forms.controls['price'].setValue(data.price);
        this.forms.controls['description'].setValue(data.description);
        this.forms.controls['type'].setValue(data.type?.type_id);
        if(data.type?.type_name)
        {this.typeName = data.type?.type_name;}
        if(data.image_url)
        {this.img = data.image_url;
          this.image_url = data.image_url;
        }
      })
    }
  }

  onImgup(event:any) {
    const file = event.target.files[0];
    if(file){
      const filereader = new FileReader();
      filereader.onload = () =>{
        this.img = filereader.result;
        this.forms.patchValue({image:file});
        this.forms.get('image')?.updateValueAndValidity();
      }
      filereader.readAsDataURL(file);
    }
  }

  submit(){
    if(this.forms.invalid)
    {
      alert("Invalid form");
      return;
    }
    const data = new FormData();

    data.append('prod_name',this.forms.value['prod_name']);
    data.append('price',this.forms.controls['price'].value);
    data.append('description',this.forms.controls['description'].value);
    data.append('image',this.forms.controls['image'].value);
    data.append('type',this.forms.controls['type'].value);

    if(this.editmode){
      this._updatedata(data);
    }else{
      this._adddata(data);
    }
  }

  private _adddata(data:FormData){
    this.prodService.newProd(data).pipe(takeUntil(this.endsub$)).subscribe(data =>{
      if(data.prod_id){
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
  
  private _updatedata(data:FormData){
    data.append("image_url",this.image_url)
    data.append("cloud_id",this.cloud_id)
    if(this.id)
    data.append("Prod_id",this.id)


    let checkmode = false;
    data.forEach((item,key) => {
      if(key=="image" && item ==""){
        checkmode=true;
        this.prodService.updateProdNotImage(data).pipe(takeUntil(this.endsub$)).subscribe(data =>{
          if(data.prod_id){
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
    })

    if(!checkmode){
      alert("Please");
     


      this.prodService.updateProd(data).pipe(takeUntil(this.endsub$)).subscribe(data =>{
        if(data.prod_id){
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
  
  }

  newType(id:number ,name:string|undefined){
    this.forms.controls['type'].setValue(id);
    if(name)
    this.typeName = name;
  }

}
