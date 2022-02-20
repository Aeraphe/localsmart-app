import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../../shared/services/products.service";
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt)

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'], providers: [{
    provide: LOCALE_ID, 
    useValue: "pt-BR"
  }],
})
export class ProductListComponent implements OnInit {

   products!:any;
   totalProducts = 0;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
     this.productService.getProducts().then(
       doc=>{
        this.products = doc
        this.totalProducts = doc.length
       }
     );

  
  }



}
