import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common'
import { environment } from "../../../../environments/environment.prod";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() link: string = '';
  @Input() products: any[] = [];
  @Input() title: string = 'Ofertas';

  selectedProduct: any;
  alertDeleteText: string = '';
  displayList = false;
  totalProducts = 0;
  constructor(private sanitizer: DomSanitizer, private currencyService:CurrencyPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    let currValueTotalItems = changes['products'].currentValue.length;

    if (currValueTotalItems != 0) {
      this.displayList = true;
    } else {
      this.displayList = false;
    }
  }

  ngOnInit(): void {}

  encodeURI = (product: Product) => {
    let baseURI = 'whatsapp://send?text=';
    let route = environment.baseUrl + 'product-details/';

    let uri = baseURI + route + product.id;

    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(uri);
    saftURI.changingThisBreaksApplicationSecurity =
      uri +
      '%0a %0a %e2%98%85 ' +
      product.name +
      '%0a %e2%86%92 ' +
      this.currencyService.transform(product.price,'BRL');
    return saftURI;
  };
}
