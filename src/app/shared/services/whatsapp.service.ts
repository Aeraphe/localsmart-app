import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { environment } from "../../../environments/environment.prod";

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
    'line-break': '%0a',
    'line-breakX2': '%0a  %0a',
    store: ' %f0%9f%8f%a0 ',
    list: ' %f0%9f%93%8b ',
    phone: '%e2%98%8e ',
    fire: '%f0%9f%94%a5 ',
    star: ' %e2%98%85 ',
    star2: '%f0%9f%8c%9f',
    down_arrow: '%e2%96%bc',
  };

  constructor(
    private sanitizer: DomSanitizer,
    private currencyService: CurrencyPipe
  ) {}

  createProductListLink = (
    productCategories: any[],
    products: any[],
    options: any
  ) => {
    let list = this.createProductListHandler(
      productCategories,
      products,
      options
    );
    let saftURI = this.createWhatsappLinkHandler(options, list);
    console.log(saftURI)
    return saftURI;
  };

  private createProductListHandler = (
    productCategories: any[],
    products: any[],
    options: any
  ) => {
    let list = '';
    let productCategory = '';

    productCategories.forEach((category: string) => {
      //Product Category
      productCategory =
        this.symbols['line-break'] +
        this.symbols.star2 +
        ' *' +
        category.toUpperCase() +
        '*' +
        this.symbols['line-breakX2'];

      let productItems = '';
      products.forEach((product: any) => {
        if (category == product.category) {
          //Check product has short description or set the description to be the product name
          let productDescription = product.short_description
            ? product.short_description.trim()
            : product.name.trim();
          //Check if the user wants to show retail price
          let retail = options.retail
            ? ' _' +
              this.currencyService.transform(
                product.price,
                'BRL',
                undefined,
                undefined,
                'pt'
              ) +
              '_'
            : '';
          //Check if the user wants to show wholesale price
          let wholesale = options.wholesale
            ? ' *' +
              this.currencyService.transform(product.wholesale, 'BRL') +
              ' [A]*'
            : '';

          //Check if the user want extra line above it product item
          let extraline = options['extra_line']
            ? this.symbols['line-breakX2']
            : this.symbols['line-break'];

          let productFullDescription = '';
          //Check if the user want to show sold product on list
          if (options.sold && product.sold) {
            productFullDescription =
              '~' +
              productDescription.slice(0, 23) +
              '...' +
              retail +
              wholesale +
              '~';

            let productItem = productFullDescription + extraline;
            productItems = productItems + productItem.trim();
          } else {
            productFullDescription = productDescription + retail + wholesale;
          }

          if (!product.sold) {
            let productItem = productFullDescription + extraline;
            productItems = productItems + productItem.trim();
          }
        }
      });

      if (productItems != '') {
        list = list + productCategory + productItems;
      }
    });

    return list;
  };

  private createWhatsappLinkHandler = (options: any, list: string) => {
    let route: string =  environment.baseUrl + 'home/';
    let baseURI: string = 'whatsapp://send?text=';
    let uri = baseURI + route;

    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(uri);
    let now = new Date();
    let storeItem =
      this.symbols['line-breakX2'] + this.symbols.store + options.store + ' - ';

    let contactItem =
      'Contato: ' + options.contact + this.symbols['line-break'];

    let contactWhatsapp =
      'Whatsapp: ' + options.whatsapp + this.symbols['line-break'];

    let social = 'Social: ' + options.social + this.symbols['line-breakX2'];

    let listDate =
      now.getDay() +
      '/' +
      now.getDate() +
      '/' +
      now.getFullYear() +
      this.symbols['line-breakX2'];

    let extraText = 'Venha conhecer!!!' + this.symbols['line-breakX2'];

    saftURI.changingThisBreaksApplicationSecurity =
      uri +
      storeItem +
      listDate +
      contactItem +
      contactWhatsapp +
      social +
      extraText +
      list;

    return saftURI;
  };

  createProductShareURI = (
    product: Product,

    route: string = environment.baseUrl + 'product-details/'
  ) => {
    let baseURI: string = 'whatsapp://send?text=';
    let uri = baseURI + route + product.id;

    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(uri);
    saftURI.changingThisBreaksApplicationSecurity =
      baseURI +
      route +
      product.id +
      '%0a %0a %e2%98%85 ' +
      product.name +
      '%0a %e2%86%92 ' +
      this.currencyService.transform(product.price, 'BRL');

    return saftURI;
  };
}
