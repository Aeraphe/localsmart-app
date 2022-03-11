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
  symbols = {
    'money-bag': '%f0%9f%92%b0 ',
    space: ' %20 ',
    'line-break': ' %0a ',
    store: ' %f0%9f%8f%a0 ',
    list: ' %f0%9f%93%8b ',
    phone: '%e2%98%8e ',
    fire:'%f0%9f%94%a5 '
  };

  constructor(
    private sanitizer: DomSanitizer,
    private currencyService: CurrencyPipe
  ) {}

  createProductList = (
    productCategories: any[],
    products: any[],
    store: string = 'LocalSmart'
  ) => {
    let baseURI: string = 'whatsapp://send?text=';
    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(baseURI);
    let list = '';
    let productCategory = '';
    let now = new Date();
    let listDate = now.getDay() + '/' + now.getDate() + '/' + now.getFullYear();

    productCategories.forEach((category: string) => {
      productCategory =
        '' + this.arrow + category.toUpperCase() + this.space + this.space;
      let productItems = '';
      products.forEach((product) => {
        if (category == product.category) {
          productItems =
            productItems +
            this.star +
            product.name +
            ' ' +
            this.symbols['money-bag'] +
            this.currencyService.transform(product.price, 'BRL') +
            this.space;
        }
      });

      if (productItems != '') {
        list = list + productCategory + productItems;
      }
    });

    console.log(list);

    saftURI.changingThisBreaksApplicationSecurity =
      baseURI +
      this.symbols.store +
      store +
      ' ' +
      listDate +
      this.symbols['line-break']  +
      "Vendas:" + '(31) 9999-9999' + this.symbols['line-break'] +  this.symbols['line-break'] +
      'Lista de Produtos:' +
      this.symbols['line-break'] +
      this.symbols['line-break'] +
      list;

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
