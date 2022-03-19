import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { RouteLocationService } from 'src/app/shared/services/route-location.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  category: string | null = '';
  totalProducts: number = 0;
  products: Product[] = [];
  productsFiltred: Product[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private locationService: RouteLocationService
  ) {
    this.activeRoute.params.subscribe((data: any) => {
      if (data.cat) {
        this.category = data.cat;
        this.locationService.setRouteLocation(
          this.category?.toUpperCase() || 'Produtos'
        );
        this.getFilterProductsByCat(data.cat);
      }
    });

    let zipObservables = zip(
      this.productsService.getProducts(),
      this.activeRoute.params
    );

    zipObservables.subscribe((data: any[]) => {
      this.products = data[0];
      this.category = data[1].cat;
      if (this.category) {
        this.getFilterProductsByCat(this.category);
      }
    });
  }

  ngOnInit(): void {}

  private getFilterProductsByCat = (category: string) => {
    if (category != null && this.products.length > 0) {
      this.productsFiltred = this.products.filter((item: Product) => {
        if (item.category.includes(category)) {
          return true;
        } else {
          return false;
        }
      });
    }
  };

  navigate = (id: string | undefined) => {
    if (id !== undefined) {
      this.router.navigate(['product-details/' + id]);
    }
  };
}
