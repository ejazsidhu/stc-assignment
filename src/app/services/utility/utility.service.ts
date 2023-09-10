import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  searchProducts(query: string,products:Product[],serachByField:string = 'product'): Product[] {
    const lowercaseQuery = query.toLowerCase();
  
    if(serachByField === 'product'){
      return products.filter((product) => {
        const lowercaseName = product.title.toLowerCase();
        const lowercaseDescription = product.description.toLowerCase();
        return lowercaseName.includes(lowercaseQuery) || lowercaseDescription.includes(lowercaseQuery);
      });
  
    }
    else{
      return products.filter((product) => {
        const lowercaseName = product.category.toLowerCase();
        return lowercaseName.includes(lowercaseQuery);
      });
    }
  }

}
