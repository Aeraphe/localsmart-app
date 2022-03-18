import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { ProductsService } from 'src/app/shared/services/products.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-change-price',
  templateUrl: './change-price.component.html',
  styleUrls: ['./change-price.component.scss'],
})
export class ChangePriceComponent implements OnInit {
  fGroup: FormGroup;
  priceDiff = 0;
  productSmallName = '';
  tax = 0;
  sugestTax = 0;
  wholesale = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductsService,
    private loaderService: LoaderService
  ) {
    this.productSmallName = product.name.slice(0, 25) + '...';
    this.fGroup = new FormGroup({
      old_price: new FormControl(product.price, [Validators.required]),
      price: new FormControl(product.price, [Validators.required]),
      price_off: new FormControl(product.price_off || 0),
      wholesale: new FormControl(product.wholesale || 0),
      price_percent: new FormControl(0),
    });
  }

  async ngOnInit(): Promise<void> {
    let wholesale = +this.fGroup.get('wholesale')?.value;
    this.tax = await this.productService.getPriceTax(wholesale);
    this.changePrice(this.tax / 100);
  }

  onSlidChange = (event: MatSliderChange) => {
    let rate = event.value || 0;
    this.changePrice(rate);
  };

  changePrice = (rate: number) => {
    let wholesale = +this.fGroup.get('wholesale')?.value;
    let newPrice = Math.round(wholesale * rate + wholesale);
    this.fGroup.patchValue({ price_percent: Math.round(rate * 100) });
    this.fGroup.patchValue({ price: newPrice });
    this.priceDiff = newPrice - wholesale;
    console.log(this.priceDiff);
  };

  formatLabel(value: number) {
    if (value >= 0) {
      return Math.round(value * 100) + '%';
    }

    return value;
  }

  savePriceChange = async () => {
    this.loaderService.setLoaderState(true);
    console.log(this.fGroup.value);
    if (this.product.id) {
      await this.productService.updateProduct(
        this.product.id,
        this.fGroup.value
      );
      this.loaderService.setLoaderState(false);
    }
    this.loaderService.setLoaderState(false);
  };
}
