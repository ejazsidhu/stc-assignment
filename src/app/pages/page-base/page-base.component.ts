import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';
import { Store } from 'src/app/interfaces/store.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { StoreService } from 'src/app/services/store/store.service';
import { TranslateHelperService } from 'src/app/services/translate/translate-helper.service';
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
  _store:Store

  languageSelection:string = 'ar';
  languageList: string[] = ['ar','en'];


  constructor(public LangHelper:TranslateHelperService ,private httpService: HttpService, private utilityService: UtilityService, private store:StoreService, private router:Router) {

    console.log('store value', this.store.getState())
    this._store = this.store.getState();
    // if(this._store.username === '')
    // this.router.navigate(['/'])

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        // debounceTime(300), // Adjust debounce time as needed (300ms in this example)
        // distinctUntilChanged() // Ensure that the same value is not emitted consecutively
      )
      .subscribe((newValue:any) => {
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

  signOut(){
    this.store.resetStore();
    this._store = this.store.getState();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
