import { Component, OnInit } from '@angular/core';
import { HeaderNavService } from '../../../shared/services/header-nav.service';
import { RouteLocationService } from '../../../shared/services/route-location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerState: Boolean = false;
  routerLocation = '';
  constructor(
    private headerService: HeaderNavService,
    private routerLocationService: RouteLocationService
  ) {
    this.routerLocationService.getRouteLocation().subscribe((location) => {
      this.routerLocation = location;
    });
  }

  ngOnInit(): void {
    this.headerService.getHeaderState().subscribe((state) => {
      this.headerState = state;
    });
  }

  toggle = () => {
    this.headerState = !this.headerState;
  };
}
