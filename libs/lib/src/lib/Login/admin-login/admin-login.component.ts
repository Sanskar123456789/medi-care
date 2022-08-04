import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { LoginService } from '../../Service/login.service';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'medi-care-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit,OnDestroy {

  constructor(private logService:LoginService,
              private router:Router,
              private formbuilder:FormBuilder,
              private userService:UserService,
              private messageService: MessageService) {}

  email="";
  password="";
  login=true;
  endsub$ :Subject<any> = new Subject();
  forms!: FormGroup;
  ngOnInit(): void {
    this._formInit();
  }

  ngOnDestroy(): void {
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _formInit(){
    this.forms = this.formbuilder.group({
      name:['', Validators.required],
      phone_no:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      Address:['', Validators.required],
    })
  }


  Login(){

    const data = {
      "email": this.email,
      "password":this.password
    }
    console.log(data);
    localStorage.clear();
    this.logService.Login(data).pipe(takeUntil(this.endsub$)).subscribe(data=>{
      console.log(data);
      localStorage.setItem("token",data.token);
      try{
        this.router.navigateByUrl('Products');
      }catch(e){
        alert('Error');
      }
    })
  }

  newUser(){
    const user = {
      name : this.forms.controls["name"].value,
      phone_no:this.forms.controls["phone_no"].value,
      email:this.forms.controls["email"].value,
      address:this.forms.controls["Address"].value,
      password:this.forms.controls["password"].value
    }

    console.log(user);
    this.userService.newUser(user).pipe(takeUntil(this.endsub$)).subscribe(data => {
      if(data.user_id){
        this.messageService.add({severity:'success', summary: 'Success', detail: 'User Added Successfully'});
            timer(1000).toPromise().then(()=>{
              this.toggle();
            })
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Not Added'});
      }
    })
  }

  toggle(){
    this.login=!this.login;
  }
}
