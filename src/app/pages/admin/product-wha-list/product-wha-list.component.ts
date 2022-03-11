import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { WhatsappService } from '../../../shared/services/whatsapp.service';

@Component({
  selector: 'app-product-wha-list',
  templateUrl: './product-wha-list.component.html',
  styleUrls: ['./product-wha-list.component.scss'],
})
export class ProductWhaListComponent implements OnInit {
  products: [] = [];
  productCategory: any[] = [];
  productWhatsappListHref = "";

  constructor(private productService: ProductsService,private whatsService:WhatsappService) {}

  async ngOnInit(): Promise<void> {
    let productCategory = await this.productService.getProductCategory();

    this.productService.getProducts().subscribe((data) => {
      this.products = data;

     this.productWhatsappListHref = this.whatsService.createProductList(productCategory,data)
      //this.filterProductCategory(productCategory);
    });
  }

  private filterProductCategory = (productCategory: string[]) => {
    this.productCategory = productCategory.filter((item: any) => {
      return this.products.reduce((prev: any, pro: any) => {
        if (item == pro.category) {
          prev = true;
        } else {
          prev = false;
        }
        return prev;
      }, false);
    });
    console.log(this.productCategory);
  };
}
