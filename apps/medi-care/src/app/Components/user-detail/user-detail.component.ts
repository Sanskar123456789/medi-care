import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, user, UserService } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'medi-care-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit,OnDestroy {
  constructor(private userService: UserService,
              private routes:ActivatedRoute
    ) {}

  email = "";
  endsub$ :Subject<any> = new Subject();
  User : user = {};
  Orders:Order[] = [];
  ngOnInit(): void {
    this._getemail();
    this._getUser();
    this._getOrder();
  }

  ngOnDestroy(){
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _getemail() {
    this.routes.params.subscribe(data=>{
      if(data['email']){
        this.email = data['email'];
      }
    })
  }

  private _getUser(){
    console.log(this.email)
    if(this.email){
      this.userService.getUserByEmail(this.email).pipe(takeUntil(this.endsub$)).subscribe(user =>{
        this.User = user;
      })
    }

  }

  private _getOrder(){
    if(this.email){
      this.userService.getOrders(this.email).pipe(takeUntil(this.endsub$)).subscribe(orders =>{
        this.Orders = orders;
      })
    }
  }
}
