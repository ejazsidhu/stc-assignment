import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { Enviroment } from 'src/enviroemtns';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent {

  productForm: FormGroup;
  categories: string[];
  selectedItemId: string | undefined;
  loading: boolean = false;
  serverUrl:string = Enviroment.SERVER_URL

  constructor(private router: Router, private fb: FormBuilder, private httpService: HttpService, private acRoutes: ActivatedRoute) {
    acRoutes.params.subscribe((p:any) => {
      console.log('params', p['id'])
      if (p['id']) {
        this.getSingleProduct(p['id']);
        this.selectedItemId = p['id'];
      }
    })
  }

  ngOnInit() {
    this.getCategories();
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['electronics', Validators.required]
    });
  }

  getCategories() {
    let url = `${Enviroment.SERVER_URL}products/categories`
    this.httpService.getCategories(url).subscribe((response) => {
      console.log('category', response)
      this.categories = response as string[];
    })
  }

  getSingleProduct(id: string) {
    this.loading = true;
    let url = `${Enviroment.SERVER_URL}products/${id}`

    this.httpService.getSingleProducts(url).subscribe((response: Product) => {
      console.log('single product', response);

      this.productForm.setValue({
        title: response.title,
        price: response.price,
        category: response.category,
        description: response.description,
        image: response.image
      });

      this.loading = false;

    })

  }


  onSubmit() {
    this.loading = true;

    console.log(this.productForm)
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      console.log('Product Submitted:', newProduct);
      let url = this.selectedItemId ? `${Enviroment.SERVER_URL}products/${this.selectedItemId}` : `${Enviroment.SERVER_URL}products`
      this.selectedItemId ? this.UpdateProduct(url, newProduct) : this.addProduct(url, newProduct);
    }
  }

  addProduct(url: string, body: Product) {
    this.httpService.addNewProduct(url, body).subscribe(response => {
      console.log('add product', response);
      this.loading = false;
      this.router.navigate(['/auth/admin/'])
    })
  }
  UpdateProduct(url: string, body: Product) {
    this.httpService.updateProduct(url, body).subscribe(response => {
      console.log('edit product', response);
      this.loading = false;
      this.router.navigate(['/auth/admin/'])
    })
  }

}
