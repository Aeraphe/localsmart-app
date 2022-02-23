import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  selectedId: number = 0;
  product!: any | null;
  products: any = [];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');



    this.route.paramMap.subscribe(async (paramMap) => {
      let id = paramMap.get('id');
      this.product = await this.productsService.getProductById(id);
    });

    this.products = await this.productsService.getProducts();
  }
}
