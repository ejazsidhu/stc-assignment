import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageBaseComponent } from './page-base/page-base.component';
import { MaterialCoreModule } from '../modules/material-core/material-core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageBaseComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialCoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
