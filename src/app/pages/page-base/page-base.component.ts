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
  searchSubscription: Subscription ;
  subscription: Subscription;

  constructor(private httpService: HttpService, private utilityService:UtilityService) {

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Adjust debounce time as needed (300ms in this example)
        distinctUntilChanged() // Ensure that the same value is not emitted consecutively
      )
      .subscribe(newValue => {
        console.log('Search query:', newValue);
        this.products = this.utilityService.searchProducts(newValue ?  newValue:'',this.products)
      });

  }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.httpService.GET(`${this.serverUrl}products`).subscribe((respose: Product[]) => {
      console.log(respose)
      this.products = respose;
    })
  }
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
