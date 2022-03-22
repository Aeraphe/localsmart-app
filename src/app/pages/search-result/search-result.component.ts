import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { RouteLocationService } from 'src/app/shared/services/route-location.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  products: Product[] = [];
  searchTerm$: Observable<string>;

  constructor(
    private searchService: SearchService,
    private locationService: RouteLocationService
  ) {
    this.locationService.setRouteLocation('Busca');
    this.searchService.getProductSearch().subscribe((data: Product[]) => {
      this.products = data;
    });

    this.searchTerm$ = this.searchService.getSearchTerm()
  }

  ngOnInit(): void {}
}
