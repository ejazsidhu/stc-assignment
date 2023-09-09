import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  searchProducts(query: string,products:Product[]): Product[] {
    const lowercaseQuery = query.toLowerCase();
  
    return products.filter((product) => {
      const lowercaseName = product.title.toLowerCase();
      const lowercaseDescription = product.description.toLowerCase();
      return lowercaseName.includes(lowercaseQuery) || lowercaseDescription.includes(lowercaseQuery);
    });
  }
}
