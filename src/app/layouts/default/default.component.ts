import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../shared/services/overlay.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  overlayState = true;

  constructor(private overlayService: OverlayService) {
    this.overlayService.getOverlayState().subscribe((state) => {
      this.overlayState = state;
    });
  }

  ngOnInit(): void {}
}
