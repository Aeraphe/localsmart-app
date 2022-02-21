import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandburgerMenuComponent } from './components/handburger-menu/handburger-menu.component';
import { CardComponent } from './components/card/card.component';
import { HeaderNavService } from './services/header-nav.service';
import { FirebaseAppService } from './services/firebase-app.service';
import { ModalComponent } from './components/modal/modal.component';
import { OverlayService } from './services/overlay.service';

@NgModule({
  declarations: [HandburgerMenuComponent, CardComponent, ModalComponent],
  imports: [CommonModule],
  exports: [HandburgerMenuComponent, CardComponent, ModalComponent],
  providers: [HeaderNavService, FirebaseAppService, OverlayService],
})
export class SharedModule {}
