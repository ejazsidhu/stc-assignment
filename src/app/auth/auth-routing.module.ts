import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminBaseComponent } from './pages/admin/admin-base/admin-base.component';
import { ProductListingComponent } from './pages/admin/product/product-listing/product-listing.component';
import { ProductAddEditComponent } from './pages/admin/product/product-add-edit/product-add-edit.component';
import { AuthGuard } from '../services/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'sign-in',
    pathMatch:'full'
  },
  {
    path:'sign-in',
    component:LoginComponent
  },
  {
    path:'admin',
    component:AdminBaseComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard',component:ProductListingComponent},
      {path:'create-product',component:ProductAddEditComponent},
      {path:'edit-product/:id',component:ProductAddEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
