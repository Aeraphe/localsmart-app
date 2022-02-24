import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { RouteLocationService } from '../../shared/services/route-location.service';

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
    private productsService: ProductsService,
    private locationService:RouteLocationService
  ) {

    this.locationService.setRouteLocation(route.snapshot.data['info']);
  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');



    this.route.paramMap.subscribe(async (paramMap) => {
      let id = paramMap.get('id');
      this.product = await this.productsService.getProductById(id);
    });

    this.products = await this.productsService.getProducts();
  }
}
