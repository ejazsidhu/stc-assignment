import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  public getProducts(url:string):Observable<Product[]>{
    return this.http.get<Product[]>(url);
  }

  public getSingleProducts(url:string):Observable<Product>{
    return this.http.get<Product>(url);
  }

  public addNewProduct(url:string,body:Product):Observable<Product>{
    return this.http.post<Product>(url,body);
  }

  public updateProduct(url:string,body:Product):Observable<Product>{
    return this.http.put<Product>(url,body);
  }

  public getCategories(url:string){
    return this.http.get(url);
  }

  public deleteProduct(url:string):Observable<Product>{
    return this.http.delete<Product>(url);
  }

}
