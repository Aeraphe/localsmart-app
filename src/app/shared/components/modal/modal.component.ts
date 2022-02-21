import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  open: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalService: ModalService, private overlayService:OverlayService) {
    this.modalService.getModalState().subscribe((state) => {
      console.log(state);
      this.open = state;
      overlayService.changeOverlayState(state);
    });
  }

  ngOnInit(): void {}

  handlerOpenOverlay = () => {};
}
