import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { AlertService } from '../../../shared/services/alert.service';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localePt);

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
})
export class ProductListComponent implements OnInit {
  @Output() openAlert: boolean = false;

  selectedProduct: any;
  alertDeleteText: string = '';
  products!: any;
  totalProducts = 0;
  constructor(
    private productService: ProductsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.handleGetProducts();
  }

  private handleGetProducts = () => {
    this.productService.getProducts().then((doc) => {
      this.products = doc;
      this.totalProducts = doc.length;
    });
  };

  openDeleteAlert = (productSelected: any) => {
    this.selectedProduct = productSelected;
    this.alertDeleteText = 'Tem certeza que deseja apagar o Produto?';
    this.openAlert = true;
    this.alertService.openAlert();
  };

  deleteProduct = () => {
    const {id,imgUrl} = this.selectedProduct;
    this.productService.deleteProduct(id,imgUrl);
    this.handleGetProducts();
  };
}
