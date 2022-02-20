import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandburgerMenuComponent } from './components/handburger-menu/handburger-menu.component';
import { CardComponent } from './components/card/card.component';
import { HeaderNavService } from './services/header-nav.service';
import { FirebaseAppService } from './services/firebase-app.service';

@NgModule({
  declarations: [HandburgerMenuComponent, CardComponent],
  imports: [CommonModule],
  exports: [HandburgerMenuComponent, CardComponent],
  providers:[HeaderNavService,FirebaseAppService]
})
export class SharedModule {}
