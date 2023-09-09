import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  public GET(url:string):Observable<Product[]>{
    return this.http.get<Product[]>(url);
  }
  public DELETE(url:string):Observable<Product>{
    return this.http.delete<Product>(url);
  }
}
