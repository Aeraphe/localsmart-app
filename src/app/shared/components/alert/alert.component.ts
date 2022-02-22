import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { OverlayService } from '../../services/overlay.service';
import { OveflowBodyService } from '../../services/oveflow-body.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  open: boolean = false;
  @Input() content: string = '';
  @Input() message: string = '';
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private alertService: AlertService,
    private overlayService: OverlayService,
    private overflowService: OveflowBodyService
  ) {
    this.alertService.getAlertState().subscribe((state) => {
      this.open = state;
      overlayService.changeOverlayState(state);
      this.overflowActiveHandler(state);
    });
  }

  private overflowActiveHandler = (state: boolean) => {
    if (state) {
      this.overflowService.activeOverflowBody();
    } else {
      this.overflowService.removeOverflowBody();
    }
  };
  ngOnInit(): void {}

  handlerOpenOverlay = () => {};

  cancel = () => {
    this.open = false;

    this.overlayService.changeOverlayState(false);
    this.overflowActiveHandler(false);
  };

  confirm = () => {
    this.onConfirm.emit(true);
    this.alertService.closeAlert();
    this.overflowActiveHandler(false);
  };
}
