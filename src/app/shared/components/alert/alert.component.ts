import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  open: boolean = false;
  @Input() content: string = '';
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private alertService: AlertService,
    private overlayService: OverlayService
  ) {
    this.alertService.getAlertState().subscribe((state) => {
      this.open = state;
      overlayService.changeOverlayState(state);
    });
  }

  ngOnInit(): void {}

  handlerOpenOverlay = () => {};

  cancel = () => {
    this.open = false;

    this.overlayService.changeOverlayState(false);
  };

  confirm = () => {

    this.onConfirm.emit(true);
    this.alertService.closeAlert();
  };
}
