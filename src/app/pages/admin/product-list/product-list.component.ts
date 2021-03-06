import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { AlertService } from '../../../shared/services/alert.service';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { Product } from 'src/app/interfaces/product';
import { RouteLocationService } from '../../../shared/services/route-location.service';

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
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  @Output() openAlert: boolean = false;

  selectedProduct: any;
  alertDeleteText: string = '';
  products!: any;
  totalProducts = 0;
  productCategories: any[] = [];
  constructor(
    private productService: ProductsService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private locationService: RouteLocationService
  ) {
    this.locationService.setRouteLocation('Adm. Produtos');
  }

  async ngOnInit(): Promise<void> {
    this.handleGetProducts();
    
  }

  private handleGetProducts = () => {
    this.productService.getAllProducts().subscribe(async (doc) => {
      this.products = doc;
      this.productCategories = await this.productService.getProductCategory();
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
    const { id, imgUrl } = this.selectedProduct;
    this.productService.deleteProduct(id, imgUrl);
    this.handleGetProducts();
  };

  updateProduct = async (id: any, value: any, field: string) => {
    console.log(value);
    let data: any = {};
    data[field] = value;
    await this.productService.updateProduct(id, data);
    this.handleGetProducts();
  };

  editProduct(product: Product) {
    this.dialog.open(ProductUpdateComponent, {
      data: product,
      height: '68rem',
      width: '50rem',
    });
  }
}
