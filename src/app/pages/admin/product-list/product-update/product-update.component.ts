import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  private subUpdateValues = new Subject();
  productUpdated$ = this.subUpdateValues.asObservable();
  uploadForm: FormGroup;
  showLoading = false;
  productCategories: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductsService
  ) {
    this.uploadForm = new FormGroup({
      name: new FormControl(product.name, [Validators.required]),
      category: new FormControl(product.category, [Validators.required]),
      price: new FormControl(product.price, [Validators.required]),
      wholesale: new FormControl(product.wholesale),
      description: new FormControl(product.description),
      short_description: new FormControl(product.short_description),
      condition: new FormControl(product.condition, [Validators.required]),
      payment_method: new FormControl(product.payment_method),
    });
  }

  async ngOnInit(): Promise<void> {
    this.uploadForm.valueChanges.pipe(debounceTime(1500)).subscribe((val) => {
      delete val.id;
      this.updateProduct(val);
    });

    this.productCategories = await this.productService.getProductCategory();
  }

  updateProduct = async (data: any) => {
    try {
      if (this.product.id) {
        this.showLoading = true;
        await this.productService.updateProduct(this.product.id, data);
        this.subUpdateValues.next(true);
        setTimeout(() => {
          this.showLoading = false;
        }, 1000);
      } else {
        this.subUpdateValues.next(false);
        this.showLoading = false;
      }
    } catch (error) {
      this.subUpdateValues.next(false);
      this.showLoading = false;
    }
  };
}
