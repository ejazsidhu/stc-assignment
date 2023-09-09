import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Enviroment } from 'src/enviroemtns';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {
  serverUrl: string = Enviroment.SERVER_URL;
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'action'];

  dataSource = new MatTableDataSource(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editProduct(element: Product) {
    console.log(element)
  }

  deleteProduct(element: Product) {
    console.log(element)
  }

  constructor(private httpService: HttpService, private utilityService: UtilityService) {
  
  }
  ngOnInit() {
    this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts() {
   this.httpService.GET(`${this.serverUrl}products`).subscribe((respose: Product[]) => {
      console.log(respose)
      this.products = respose;
      this.dataSource = new MatTableDataSource(this.products);

    })
  }


 
}
