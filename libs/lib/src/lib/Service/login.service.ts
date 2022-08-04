import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  api ="http://localhost:8008";
  constructor(private http:HttpClient) { }

  Login(Data:{email:string, password:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/authenticate`,Data);
  }



}
