import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, user, UserService } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'medi-care-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit,OnDestroy {
  constructor(private userService: UserService) {}

  email = "";
  endsub$ :Subject<any> = new Subject();
  User : user = {};
  Orders:Order[] = [];
  ngOnInit(): void {
    this._getUser();
    this._getOrder();
  }

  ngOnDestroy(){
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _getUser(){
    let email;
    if(localStorage.getItem('userEmail')){
      email = localStorage.getItem('userEmail');
    }
    if(email){
      this.userService.getUserByEmail(email).pipe(takeUntil(this.endsub$)).subscribe(user =>{
        this.User = user;
      })
    }

  }

  private _getOrder(){
    let email;
    if(localStorage.getItem('userEmail')){
      email = localStorage.getItem('userEmail');
    }
    if(email){
      this.userService.getOrders(email).pipe(takeUntil(this.endsub$)).subscribe(orders =>{
        this.Orders = orders;
      })
    }
  }
}
