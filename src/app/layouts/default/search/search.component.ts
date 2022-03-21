import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';

import Fuse from 'fuse.js';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  showSearch = false;

  private subJectProductFiltred: Subject<Product[]> = new Subject();
  productFiltred$ = this.subJectProductFiltred.asObservable();
  products = [];
  search: string = '';
  search$: Subject<string> = new Subject();
  fuzzySearch: any;
  @ViewChild('search_input') searchInputRef!: ElementRef<HTMLInputElement>;
  constructor(
    private serachService: SearchService,
    private productService: ProductsService,
    private router: Router,
    private loadingService: LoaderService
  ) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.fuzzySearch = new Fuse(data, {
        keys: ['name'],
        threshold: 0,
        isCaseSensitive: false,
        includeScore: true,
      });
    });
  }

  ngOnInit(): void {
    this.serachFilterHandler();
  }

  private serachFilterHandler = () => {
    this.search$
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((data) => {
        let productFiltred = this.fuzzySearch
          .search(data)
          .reduce((pre: any, next: any) => {
            pre = pre || [];
            pre.push(next.item);
            return pre;
          }, []);
        this.subJectProductFiltred.next(productFiltred);
        this.loadingService.setLoaderState(false);
        this.searchInputRef.nativeElement.blur();
      });
  };
  ngAfterViewInit() {
    this.serachService.searchAction().subscribe((action) => {
      this.showSearch = action;
      if (action) {
        setTimeout(() => {
          this.setFocous();
        }, 200);
      }
    });
  }

  toogle = () => {
    this.serachService.toogle();
  };

  setFocous = () => {
    this.searchInputRef.nativeElement.focus();
  };

  searchProduct = (data: any) => {
    if (data.target.value != '') {
      this.loadingService.setLoaderState(true);
      this.search$.next(data.target.value);
    }
  };

  navigate = (id: string | undefined) => {
    if (id !== undefined) {
      this.toogle();
      this.router.navigate(['product-details/' + id]);
    }
  };
}
