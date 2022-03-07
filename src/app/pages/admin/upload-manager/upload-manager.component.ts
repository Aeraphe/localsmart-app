import { Component, OnInit } from '@angular/core';
import { RouteLocationService } from '../../../shared/services/route-location.service';

@Component({
  selector: 'app-upload-manager',
  templateUrl: './upload-manager.component.html',
  styleUrls: ['./upload-manager.component.scss'],
})
export class UploadManagerComponent implements OnInit {
  files: File[] = [];

  constructor(private locationService: RouteLocationService) {
    this.locationService.setRouteLocation('Add. Produto');
  }

  ngOnInit(): void {}
}
