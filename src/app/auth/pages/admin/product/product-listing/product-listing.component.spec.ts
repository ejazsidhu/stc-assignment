import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ProductListingComponent } from './product-listing.component';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Product } from 'src/app/interfaces/products.interface';
import { MaterialCoreModule } from 'src/app/modules/material-core/material-core.module';


describe('ProductListingComponent', () => {
    let component: ProductListingComponent;
    let fixture: ComponentFixture<ProductListingComponent>;
    let router: Router;
    let httpService: HttpService;
    let utilityService: UtilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductListingComponent],
            imports: [MaterialCoreModule],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: HttpService, useClass: MockHttpService },
                { provide: UtilityService, useClass: MockUtilityService },
            ],
        });

        fixture = TestBed.createComponent(ProductListingComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        httpService = TestBed.inject(HttpService);
        utilityService = TestBed.inject(UtilityService);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getProducts() on ngOnInit', () => {
        spyOn(component, 'getProducts');
        component.ngOnInit();
        expect(component.getProducts).toHaveBeenCalled();
    });

    it('should initialize the MatTableDataSource with an empty array', () => {
        expect(component.dataSource.data).toEqual([]);
    });

    it('should navigate to edit-product when editProduct is called', () => {
        const routerSpy = spyOn(router, 'navigate');
        const product: Product = { id: 1, title: 'Product 1', description: 'Description', category: 'Category', price: 10, image: '' };
        component.editProduct(product);
        expect(routerSpy).toHaveBeenCalledWith(['auth/admin/edit-product', product.id]);
    });

    it('should delete a product and update the data source when deleteProduct is called', () => {
        const product: Product = { id: 1, title: 'Product 1', description: 'Description', category: 'Category', price: 10, image: '' };
        component.products = [product];
        const httpServiceSpy = spyOn(httpService, 'deleteProduct').and.returnValue(of(product));
        const consoleSpy = spyOn(console, 'log');

        component.deleteProduct(product);

        expect(httpServiceSpy).toHaveBeenCalledWith(`${component.serverUrl}products/${product.id}`);
        expect(component.products).toEqual([]);
        expect(component.dataSource.data).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith(product);
    });

  });

class MockRouter {
    navigate() { }
}

class MockHttpService {
    getProducts() {
        return of([]);
    }

    deleteProduct() {
        return of({});
    }
}

class MockUtilityService {
    // Implement mock behavior if needed
}
