import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exit } from 'process';
import { RouteLocationService } from 'src/app/shared/services/route-location.service';
import { ProductsService } from '../../../shared/services/products.service';
import { WhatsappService } from '../../../shared/services/whatsapp.service';

@Component({
  selector: 'app-product-wha-list',
  templateUrl: './product-wha-list.component.html',
  styleUrls: ['./product-wha-list.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
})
export class ProductWhaListComponent implements OnInit {
  products: any[] = [];
  productsFiltred: any[] = [];
  productCategory: any[] = [];
  productCategoryFilter: any[] = [];
  productWhatsappListHref = '';

  options: any = {
    store: 'LocalSmart',
    contact: '(31) 3243-1385',
    whatsapp: '(31) 99429-2827',
    social: '@lojalocalsmart',
    wholesale: false,
    retail: true,
    sold: false,
    extra_line: true,
  };

  x = '';
  constructor(
    private productService: ProductsService,
    private whatsService: WhatsappService,
    private locationService: RouteLocationService,
    private routeActive: ActivatedRoute
  ) {
    this.locationService.setRouteLocation(
      this.routeActive.snapshot.data['info']
    );
  }

  async ngOnInit(): Promise<void> {
    this.productService.getProducts().subscribe(async (producs) => {
      this.products = producs;
      this.removeSoldProducts();
      this.productCategory = await this.getProductCategories(
        this.productsFiltred
      );
      this.productCategoryFilter = this.productCategory;
      this.productWhatsappListHref = this.whatsService.createProductListLink(
        this.productCategoryFilter,
        this.productsFiltred,
        this.options
      );
    });
  }

  private removeSoldProducts = () => {
    if (!this.options.sold) {
      this.productsFiltred = this.products.filter((product) => {
        if (!product.sold) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      this.productsFiltred = this.products;
    }
  };

  removeSoldProductsHandler = (evt: any) => {
    this.options[evt.target.value] = evt.target.checked;
    this.removeSoldProducts();
    this.productWhatsappListHref = this.whatsService.createProductListLink(
      this.productCategoryFilter,
      this.productsFiltred,
      this.options
    );
  };

  private getProductCategories = async (products: any[]): Promise<any> => {
    let categories = await this.productService.getProductCategory();

    let categoriesFinded = categories.filter((cat: any) => {
      let hasCategory = false;
      products.forEach((product: any) => {
        if (product.category == cat.name) {
          hasCategory = true;
        }
      });
      return hasCategory;
    });

    const sortable = Object.entries(categoriesFinded)
      .sort(([, a], [, b]) => a.position - b.position)
      .reduce((last: any, next) => {
        return [...last, next[1].name];
      }, []);

    return sortable;
  };

  setFilterProductsByCategory = (item: any) => {
    let hasFilterCategory = false;
    if (item.value != '') {
      this.productCategoryFilter.forEach((category) => {
        if (category == item.value) {
          hasFilterCategory = true;
        }
      });

      if (!hasFilterCategory) {
        this.productCategoryFilter.push(item.value);
      }

      this.productWhatsappListHref = this.whatsService.createProductListLink(
        this.productCategoryFilter,
        this.products,
        this.options
      );
    }
  };

  clearProductCategoryFilter = () => {
    this.productCategoryFilter = [];
    this.productWhatsappListHref = this.whatsService.createProductListLink(
      this.productCategoryFilter,
      this.products,
      this.options
    );
  };

  deleteSelectedCategory = (category: string) => {
    let productCategoryFilter = this.productCategoryFilter.filter((item) => {
      if (item !== category) {
        return true;
      } else {
        return false;
      }
    });

    this.productCategoryFilter = productCategoryFilter;

    this.productWhatsappListHref = this.whatsService.createProductListLink(
      this.productCategoryFilter,
      this.products,
      this.options
    );
  };

  setPriceTypeToDisplay = (evt: any) => {
    this.options[evt.target.value] = evt.target.checked;
    this.productWhatsappListHref = this.whatsService.createProductListLink(
      this.productCategoryFilter,
      this.products,
      this.options
    );
  };
}
