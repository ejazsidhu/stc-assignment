import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/products.interface';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent {
  products:Product[]=[
    {id:0,name:'Alpha bag', description:'it is Alpha bag', imageUrl:'assets/images/bag-1.png',price:500},
    {id:0,name:'Alpha bag', description:'it is Alpha bag', imageUrl:'assets/images/bag-1.png',price:500},
    {id:0,name:'Alpha bag', description:'it is Alpha bag', imageUrl:'assets/images/bag-1.png',price:500},
    {id:0,name:'Alpha bag', description:'it is Alpha bag', imageUrl:'assets/images/bag-1.png',price:500},
    {id:0,name:'Alpha bag', description:'it is Alpha bag', imageUrl:'assets/images/bag-1.png',price:500},
    {id:0,name:'Alpha bag', description:'it is Alpha bag', imageUrl:'assets/images/bag-1.png',price:500},
  ];

}
