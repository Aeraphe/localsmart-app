import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteLocationService } from 'src/app/shared/services/route-location.service';
import { StoreService } from '../../../shared/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  storeData?: any;

  constructor(
    private storeService: StoreService,
    private locationService: RouteLocationService,
    private routeActive: ActivatedRoute
  ) {
    this.locationService.setRouteLocation(
      this.routeActive.snapshot.data['info']
    );
  }

  ngOnInit(): void {
    this.storeService.getStore().subscribe((data) => {
      this.storeData = data[0];
    });
  }
}
