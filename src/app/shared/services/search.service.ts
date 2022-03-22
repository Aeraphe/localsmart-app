import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoaderService } from './loader.service';
import { ProductsService } from './products.service';
import Fuse from 'fuse.js';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  action = false;
  private subjectToogle = new BehaviorSubject(this.action);
  private searchMenuToogle$ = this.subjectToogle.asObservable();

  private subjectSearchTerm = new BehaviorSubject('');
  private searchTerm$ = this.subjectSearchTerm.asObservable();

  private subJectProductFiltred: BehaviorSubject<Product[]> | any =
    new BehaviorSubject([]);
  productFiltred$ = this.subJectProductFiltred.asObservable();

  fuzzySearch: any;

  constructor(
    private productService: ProductsService,
    private loadingService: LoaderService
  ) {
    this.productService.getProducts().subscribe((data) => {
      this.fuzzySearch = new Fuse(data, {
        keys: ['name'],
        threshold: 0,
        isCaseSensitive: false,
        includeScore: true,
      });
    });
  }

  getSearchTerm = () => {
    return this.searchTerm$;
  };

  searchProduct = (search: any) => {
    if (search != '') {
      this.subjectSearchTerm.next(search);
      this.loadingService.setLoaderState(true);

      let productFiltred = this.fuzzySearch
        .search(search)
        .reduce((pre: any, next: any) => {
          pre = pre || [];
          pre.push(next.item);
          return pre;
        }, []);

      this.subJectProductFiltred.next(productFiltred);
      this.loadingService.setLoaderState(false);
    }
  };

  getProductSearch = () => {
    return this.productFiltred$;
  };

  toogle = () => {
    this.action = !this.action;
    this.subjectToogle.next(this.action);
  };

  searchAction = () => {
    return this.searchMenuToogle$;
  };
}
