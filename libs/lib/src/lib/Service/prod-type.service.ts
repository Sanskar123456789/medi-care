import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { prod_type } from '../Models/Prod_type';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdTypeService {

  api ="http://localhost:8008";

  constructor(private http:HttpClient) { }

  getProducts():Observable<prod_type[]>{
    return this.http.get<prod_type[]>(`${this.api}/getProductsType`);
  }

  getProduct(id:number):Observable<prod_type>{
    return this.http.get<prod_type>(`${this.api}/getOneProductType/${id}`);
  }

  deleteProd(id:number):Observable<prod_type>{
    return this.http.delete<prod_type>(`${this.api}/delteProductType/${id}`);
  }

  updateProd(Products:prod_type):Observable<prod_type>{
    return this.http.put<prod_type>(`${this.api}/updateProductType`,Products);
  }

  newProd(Products:prod_type):Observable<prod_type>{
    return this.http.post<prod_type>(`${this.api}/newProductType`,Products);
  }
}
