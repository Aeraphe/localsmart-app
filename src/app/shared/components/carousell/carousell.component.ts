import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

interface Item {
  name: string;
  id?: string;
  url: string;
  price: string;
  condition?: number;
  sold?: number;
  payment_method?: string;
}

@Component({
  selector: 'app-carousell',
  templateUrl: './carousell.component.html',
  styleUrls: ['./carousell.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
})
export class CarousellComponent implements OnInit, OnChanges {
  itemDisplayed!: Item;
  private itemSelectedIndex: number = 0;
  private totalItems = 0;
  loadCorousell = false;
  @Input() data: any[] = [];
  @Input() link: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    let currValueTotalItems = changes['data'].currentValue.length;

    if (currValueTotalItems != 0) {
      this.showItem();
      this.loadCorousell = true;
    }
  }

  ngOnInit(): void {}

  showItem = () => {
    this.totalItems = this.data.length;

    this.setDisplayedItemValue();
    if (this.itemSelectedIndex >= this.totalItems - 1) {
      this.itemSelectedIndex = 0;
    } else {
      this.itemSelectedIndex++;
    }
    setInterval(() => {
      this.setDisplayedItemValue();

      if (this.itemSelectedIndex >= this.totalItems - 1) {
        this.itemSelectedIndex = 0;
      } else {
        this.itemSelectedIndex++;
      }
    }, 7000);
  };

  private setDisplayedItemValue = () => {
    let product = this.data[this.itemSelectedIndex];
    this.itemDisplayed = {
      name: product.name,
      id: product.id,
      url: product.url,
      price: product.price,
      sold: product?.sold,
      condition: product?.codition,
      payment_method: product?.payment_method,
    };
  };
}
