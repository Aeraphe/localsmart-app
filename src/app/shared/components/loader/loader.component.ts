import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OveflowBodyService } from '../../services/oveflow-body.service';
import { OverlayService } from '../../services/overlay.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  activate = false;
  constructor(
    private overlay: OverlayService,
    private overflow: OveflowBodyService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.getLoaderState().subscribe((state) => {
      this.activateLoaderHandler(state);
    });
  }

  activateLoaderHandler = (activate: boolean = false) => {
    this.activate = activate;
    if (activate) {
      this.overlay.changeOverlayState(activate);
      this.overflow.activeOverflowBody();
      return;
    }

    this.overlay.changeOverlayState(activate);
    this.overflow.removeOverflowBody();
  };
}
