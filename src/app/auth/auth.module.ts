import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdminBaseComponent } from './pages/admin/admin-base/admin-base.component';
import { ProductListingComponent } from './pages/admin/product/product-listing/product-listing.component';
import { ProductAddEditComponent } from './pages/admin/product/product-add-edit/product-add-edit.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    AdminBaseComponent,
    ProductListingComponent,
    ProductAddEditComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
