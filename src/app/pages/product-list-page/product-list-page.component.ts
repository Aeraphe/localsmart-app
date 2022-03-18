import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { RouteLocationService } from 'src/app/shared/services/route-location.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  category: string | null = '';
  totalProducts: number = 0;
  products: Product[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private locationService: RouteLocationService
  ) {
    this.category = this.activeRoute.snapshot.paramMap.get('cat');
    this.locationService.setRouteLocation(this.category?.toUpperCase() || 'Produtos' );
  }

  ngOnInit(): void {

    if (this.category != null) {
      let cat = this.category;
      this.productsService.getProducts().subscribe((data) => {
        this.products = data.filter((item: Product) => {
          if (item.category.includes(cat)) {
            return true;
          } else {
            return false;
          }
        });
      });
    }
  }

  navigate = (id: string | undefined) => {
    if (id !== undefined) {
      this.router.navigate(['product-details/' + id]);
    }
  };
}
