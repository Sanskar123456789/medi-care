import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api ="http://localhost:8008";

  constructor(private http:HttpClient) { }

  addOnlineOrder(Products:Product[] , User:string) :Observable<any>{
    return this.http.post<any>(`${this.api}/onlinePayment/${User}`, Products);
  }

  getAllOrder():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.api}/allOrders`);
  }

  
}
