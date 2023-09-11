// chat gpt

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductAddEditComponent } from './product-add-edit.component';
import { HttpService } from 'src/app/services/http/http.service';
import { Product } from 'src/app/interfaces/products.interface';
import { Enviroment } from 'src/enviroemtns';
import { MaterialCoreModule } from 'src/app/modules/material-core/material-core.module';

describe('ProductAddEditComponent', () => {
  let component: ProductAddEditComponent;
  let fixture: ComponentFixture<ProductAddEditComponent>;
  let router: Router;
  let fb: FormBuilder;
  let httpService: HttpService;
  let activatedRoute: ActivatedRoute;
  let serverUrl = Enviroment.SERVER_URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddEditComponent],
      imports: [ReactiveFormsModule,MaterialCoreModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: FormBuilder, useClass: MockFormBuilder },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: HttpService, useClass: MockHttpService },
      ],
    });

    fixture = TestBed.createComponent(ProductAddEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
    httpService = TestBed.inject(HttpService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productForm with form controls', () => {
    component.ngOnInit();
    const controls = component.productForm.controls;
    expect(controls['title']).toBeTruthy();
    expect(controls['price']).toBeTruthy();
    expect(controls['description']).toBeTruthy();
    expect(controls['image']).toBeTruthy();
    expect(controls['category']).toBeTruthy();
  });

  it('should get categories on ngOnInit', () => {
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
  });

  it('should get categories and update categories array when getCategories is called', () => {
    spyOn(httpService, 'getCategories').and.returnValue(of(['Category1', 'Category2']));
    component.getCategories();
    expect(httpService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(['Category1', 'Category2']);
  });

  it('should get single product and update form when getSingleProduct is called', () => {
    const product: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      image: 'image1.jpg',
      category: 'Category 1',
    };
    spyOn(httpService, 'getSingleProducts').and.returnValue(of(product));
    spyOn(console, 'log');
    spyOn(component.productForm, 'setValue');

    component.getSingleProduct(product.id as string);

    expect(httpService.getSingleProducts).toHaveBeenCalledWith(`${component.serverUrl}products/${product.id}`);
    expect(component.loading).toBeFalse();
    expect(console.log).toHaveBeenCalledWith('single product', product);
    expect(component.productForm.setValue).toHaveBeenCalledWith({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    });
  });

  it('should call addProduct when onSubmit is called with no selectedItemId', () => {
    const newProduct: Product = {
      title: 'New Product',
      price: 20,
      description: 'New Description',
      image: 'new.jpg',
      category: 'Category 2',
    };
    spyOn(httpService, 'addNewProduct').and.returnValue(of(newProduct));
    spyOn(console, 'log');
    component.selectedItemId = undefined;
    component.productForm.setValue(newProduct);

    component.onSubmit();

    expect(httpService.addNewProduct).toHaveBeenCalledWith(`${component.serverUrl}products`, newProduct);
    expect(console.log).toHaveBeenCalledWith('add product', newProduct);
    expect(component.loading).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/admin/']);
  });

  it('should call updateProduct when onSubmit is called with selectedItemId', () => {
    const updatedProduct: Product = {
      id: '1',
      title: 'Updated Product',
      price: 30,
      description: 'Updated Description',
      image: 'updated.jpg',
      category: 'Category 3',
    };
    spyOn(httpService, 'updateProduct').and.returnValue(of(updatedProduct));
    spyOn(console, 'log');
    component.selectedItemId = '1';
    component.productForm.setValue(updatedProduct);

    component.onSubmit();

    expect(httpService.updateProduct).toHaveBeenCalledWith(`${component.serverUrl}products/${component.selectedItemId}`, updatedProduct);
    expect(console.log).toHaveBeenCalledWith('edit product', updatedProduct);
    expect(component.loading).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/admin/']);
  });
});

class MockRouter {
  navigate() {}
}

class MockFormBuilder {
  group() {
    return {
      value: () => {},
      setValue: () => {},
    };
  }
}

class MockActivatedRoute {
  params = of({});
}

class MockHttpService {
  getCategories() {
    return of([]);
  }

  getSingleProducts() {
    return of({});
  }

  addNewProduct() {
    return of({});
  }

  updateProduct() {
    return of({});
  }
}

