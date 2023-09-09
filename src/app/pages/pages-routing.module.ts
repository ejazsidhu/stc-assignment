import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageBaseComponent } from './page-base/page-base.component';

const routes: Routes = [
  // {path:'',redirectTo:'landing',pathMatch:'full'},
  {path:'', component:PageBaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
