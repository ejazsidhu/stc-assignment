import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { StoreService } from 'src/app/services/store/store.service';
import { MaterialCoreModule } from 'src/app/modules/material-core/material-core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let storeService: StoreService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,MaterialCoreModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: StoreService, useClass: MockStoreService },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    router = TestBed.inject(Router);
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {

    const username = component.form.get('username')?.value;
    const password = component.form.get('password')?.value;

    expect(username).toEqual('');
    expect(password).toEqual('');
  });

  it('should set error to false initially', () => {
    expect(component.error).toBeFalse();
  });

  it('should return an error message for a required field', () => {
    const errorMessage = component.getErrorMessage('username');
    expect(errorMessage).toEqual('You must enter a username value');
  });

  it('should call navigate to admin route when credentials are valid', () => {
    const routerSpy = spyOn(router, 'navigate');
    const storeSetStateSpy = spyOn(storeService, 'setState');
    component.form.setValue({ username: 'admin', password: 'admin@123' });
    component.submit();
    expect(routerSpy).toHaveBeenCalledWith(['/auth/admin']);
    expect(storeSetStateSpy).toHaveBeenCalledWith({ username: 'admin', password: 'admin@123', role: 'admin' });
  });

  it('should call navigate to default route when credentials are invalid', () => {
    const routerSpy = spyOn(router, 'navigate');
    const storeSetStateSpy = spyOn(storeService, 'setState');
    component.form.setValue({ username: 'invalid', password: 'invalid' });
    component.submit();
    expect(routerSpy).toHaveBeenCalledWith(['/']);
    expect(storeSetStateSpy).toHaveBeenCalledWith({ username: 'invalid', password: 'invalid', role: 'user' });
  });
});

// Mocking Router and StoreService
class MockRouter {
  navigate() {}
}

class MockStoreService {
  setState() {}
}
