import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderNavService } from '../../shared/services/header-nav.service';
import { ProductsService } from '../../shared/services/products.service';
import { LoaderService } from '../../shared/services/loader.service';
import { RouteLocationService } from '../../shared/services/route-location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  touch = true;
  products: any = [];
  productsWithPromo = [];

  @ViewChild('photo') divPhotoEl!: ElementRef<HTMLDivElement>;
  constructor(
    private headerService: HeaderNavService,
    private productsService: ProductsService,
    private loaderService: LoaderService,
    private locationService:RouteLocationService
  ) {
    this.getProdutcsHandle();
    this.locationService.setRouteLocation('Principal');
  }

  private getProdutcsHandle = (): void => {
    this.loaderService.setLoaderState(true);
    this.productsService.getProducts().subscribe((data) => {
      //Reverse for put the last inserted products in top of array
      this.products = [...data.reverse()];
      this.filterProductsWithPromo(this.products);
      this.loaderService.setLoaderState(false);
    });
  };

  private filterProductsWithPromo = (data: []) => {
    this.productsWithPromo = data.filter((item: any) => {
      return item.promo;
    });
  };

  ngOnInit(): void {
    this.toogleAppHeader();
  }

  toogleAppHeader = () => {
    if (this.touch) {
      this.headerService.open();
      this.touch = false;

      setTimeout(() => {
        this.headerService.close();
        this.touch = true;
      }, 5000);
    }
  };
}
