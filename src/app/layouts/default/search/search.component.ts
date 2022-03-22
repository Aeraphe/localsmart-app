import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';

import Fuse from 'fuse.js';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
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

  products$: Observable<Product[]>;
  search: string = '';


  @ViewChild('search_input') searchInputRef!: ElementRef<HTMLInputElement>;
  constructor(
    private searchService: SearchService,
    private router: Router,

  ) {
   this.products$ = this.searchService.getProductSearch()
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.searchService.searchAction().subscribe((action) => {
      this.showSearch = action;
      if (action) {
        setTimeout(() => {
          this.setFocous();
        }, 200);
      }
    });
  }

  toogle = () => {
    this.searchService.toogle();
  };

  setFocous = () => {
    this.searchInputRef.nativeElement.focus();
  };

  searchProduct = (data: any) => {
    let search = data.target.value;
    if (search != '') {
      this.searchInputRef.nativeElement.blur();
      this.searchService.searchProduct(search);
    }
  };

  navigate = (id: string | undefined) => {
    if (id !== undefined) {
      this.toogle();
      this.router.navigate(['search-result/' + id]);
    }
  };
}
