import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProdServiceService {

  api ="http://localhost:8008";

  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/getProducts`);
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.api}/getOneProduct/${id}`);
  }

  deleteProd(id:number):Observable<Product>{
    return this.http.delete<Product>(`${this.api}/delteProduct/${id}`);
  }

  updateProd(Products:FormData):Observable<Product>{
    return this.http.put<Product>(`${this.api}/updateProduct`,Products);
  }

  updateProdNotImage(Products:FormData):Observable<Product>{
    return this.http.put<Product>(`${this.api}/updateProductNotImage`,Products);
  }

  newProd(Products:FormData):Observable<Product>{
    return this.http.post<Product>(`${this.api}/newProduct`,Products);
  }
}
