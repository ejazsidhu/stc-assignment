import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Enviroment } from 'src/enviroemtns';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent {

  serverUrl: string = Enviroment.SERVER_URL;
  products: Product[] = [];
  searchControl = new FormControl('');
  searchSubscription: Subscription;
  searchCaterogry: string = '';
  subscription: Subscription;
  categories: string[];
  loading: boolean = false;

  constructor(private httpService: HttpService, private utilityService: UtilityService) {

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Adjust debounce time as needed (300ms in this example)
        distinctUntilChanged() // Ensure that the same value is not emitted consecutively
      )
      .subscribe(newValue => {
        console.log('Search query:', newValue);
        this.products = this.utilityService.searchProducts(newValue ? newValue : '', this.products)
      });

  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  resetProducts() {
    this.searchCaterogry = '';
    this.getProducts();
  }
  searchByCategory() {
    console.log(this.searchCaterogry)
    this.getProducts();

  }


  getProducts() {
    this.loading = true;
    this.httpService.getProducts(`${this.serverUrl}products`).subscribe((respose: Product[]) => {
      console.log(respose)
      this.products = respose;
      if (this.searchCaterogry) {
        this.products = this.utilityService.searchProducts(this.searchCaterogry, this.products, 'category')
      }
      this.loading = false;
    })
  }

  getCategories() {
    let url = `${Enviroment.SERVER_URL}products/categories`
    this.httpService.getCategories(url).subscribe((response) => {
      console.log('category', response)
      this.categories = response as string[];
    })
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
