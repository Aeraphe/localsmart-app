import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  open: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private alertService: AlertService, private overlayService:OverlayService) {
    this.alertService.getAlertState().subscribe((state) => {
      console.log(state);
      this.open = state;
      overlayService.changeOverlayState(state);
    });
  }

  ngOnInit(): void {}

  handlerOpenOverlay = () => {};
}
