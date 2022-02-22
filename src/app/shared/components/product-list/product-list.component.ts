import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: any[] = [];

  selectedProduct: any;
  alertDeleteText: string = '';
  displayList = false;
  totalProducts = 0;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    let currValueTotalItems = changes['products'].currentValue.length;

    if (currValueTotalItems != 0) {
      
      this.displayList = true;
    }else{
      this.displayList = false;
    }
  }

  ngOnInit(): void {}
}
