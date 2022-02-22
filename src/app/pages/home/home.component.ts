import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderNavService } from '../../shared/services/header-nav.service';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  touch = true;
  products = [];
  productsWithPromo = [];

  @ViewChild('photo') divPhotoEl!: ElementRef<HTMLDivElement>;
  constructor(
    private headerService: HeaderNavService,
    private productsService: ProductsService
  ) {
    this.getProdutcsHandle();
  }

  private getProdutcsHandle = (): void => {
    this.productsService.getProducts().then((data) => {
      this.products = data;
      this.filterProductsWithPromo(data);
      console.log(data);
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
