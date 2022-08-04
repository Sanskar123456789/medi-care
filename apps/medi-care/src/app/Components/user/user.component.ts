import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user, UserService } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'medi-care-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit,OnDestroy {
  constructor(private userService: UserService,
              private router: Router
    ) {}

  endsub$ :Subject<any> = new Subject();
  users:user[]= [];
  link="";
  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy(){
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _getUsers(){
    this.userService.getUsers().pipe(takeUntil(this.endsub$)).subscribe(users =>{
      this.users = users;
    })
  }

  details(email:string){
    this.router.navigateByUrl(`UserDetail/${email}`)
  }
}
