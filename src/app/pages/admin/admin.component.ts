import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteLocationService } from '../../shared/services/route-location.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private locationService: RouteLocationService,
    private routeActive: ActivatedRoute
  ) {
    this.locationService.setRouteLocation(
      this.routeActive.snapshot.data['info']
    );
  }

  ngOnInit(): void {}
}
