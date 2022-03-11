import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  space = ' %0a ';
  star = ' %e2%98%85 ';
  arrow = ' %e2%86%92 ';

  constructor(
    private sanitizer: DomSanitizer,
    private currencyService: CurrencyPipe
  ) {}

  createProductList = (productCategories: any[], products: any[],store:string = "LocalSmart") => {
    let baseURI: string = 'whatsapp://send?text=';
    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(baseURI);
    let list = '';
    let productCategory = '';

    productCategories.forEach((category) => {
      productCategory = ' &#8195 ' + this.arrow + category + this.space + this.space;
      let productItems = '';
      products.forEach((product) => {
        if (category == product.category) {
          productItems =
            productItems +
            this.star +
            product.name + " " +
            this.currencyService.transform(product.price, 'BRL') +
            this.space;
        }
      });

      if (productItems != '') {
        list =  list + productCategory + productItems;
      }
    });

    console.log(list);

    saftURI.changingThisBreaksApplicationSecurity = baseURI + store + " " + Date() + this.space + "Lista de Produtos:" + this.space+  list;

    return saftURI;
  };

  createProductShareURI = (
    product: Product,

    route: string = 'https://localsmart-app.web.app/product-details/'
  ) => {
    let baseURI: string = 'whatsapp://send?text=';
    let uri = baseURI + route + product.id;

    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(uri);
    saftURI.changingThisBreaksApplicationSecurity =
      uri +
      '%0a %0a %e2%98%85 ' +
      product.name +
      '%0a %e2%86%92 ' +
      this.currencyService.transform(product.price, 'BRL');
    return saftURI;
  };
}
