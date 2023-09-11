import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Enviroment } from 'src/enviroemtns';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {
 
  serverUrl: string = Enviroment.SERVER_URL;
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'price', 'action'];
  loading: boolean = false;
  searchSubscription: Subscription;


  constructor(private router: Router, private httpService: HttpService, private utilityService: UtilityService) {

  }

  ngOnInit() {
    this.getProducts();
  }
  dataSource = new MatTableDataSource(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editProduct(element: Product) {
    this.router.navigate(['auth/admin/edit-product', element.id]);
  }

  deleteProduct(product: Product) {
    let url = `${this.serverUrl}products/${product.id}`;
    this.httpService.deleteProduct(url).subscribe((response: Product) => {
      console.log(response);
      this.products = this.products.filter(p => p.id !== product.id);
      this.dataSource = new MatTableDataSource(this.products);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts() {
    this.loading = true;
    this.httpService.getProducts(`${this.serverUrl}products`).subscribe((respose: Product[]) => {
      console.log(respose)
      this.products = respose;
      this.dataSource = new MatTableDataSource(this.products);
      this.loading = false;
    })
  }



}
