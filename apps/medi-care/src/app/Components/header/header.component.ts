import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'medi-care-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private routes:Router) {}

  ngOnInit(): void {}

  logout(){
    localStorage.clear();
    this.routes.navigateByUrl('/Login');
  }
}
