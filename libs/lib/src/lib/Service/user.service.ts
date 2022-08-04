import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../Models/user';
import { Order } from '../Models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api ="http://localhost:8008";

  constructor(private http:HttpClient) { }

  getUserByEmail(email:string):Observable<user> {
    return this.http.post<user>(`${this.api}/user`,email);
  }

  getOrders(email:string):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.api}/getOrder/${email}`);
  }
  getUsers():Observable<user[]>{
    return this.http.get<user[]>(`${this.api}/allUsers`);
  }

  newUser(data:user):Observable<user>{
    return this.http.post<user>(`${this.api}/newUser`,data);
  }
}
