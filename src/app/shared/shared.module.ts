import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandburgerMenuComponent } from './components/handburger-menu/handburger-menu.component';
import { CardComponent } from './components/card/card.component';
import { HeaderNavService } from './services/header-nav.service';
import { FirebaseAppService } from './services/firebase-app.service';
import { AlertComponent } from './components/alert/alert.component';
import { OverlayService } from './services/overlay.service';

@NgModule({
  declarations: [HandburgerMenuComponent, CardComponent, AlertComponent],
  imports: [CommonModule],
  exports: [HandburgerMenuComponent, CardComponent, AlertComponent],
  providers: [HeaderNavService, FirebaseAppService, OverlayService],
})
export class SharedModule {}
