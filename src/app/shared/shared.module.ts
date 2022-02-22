import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandburgerMenuComponent } from './components/handburger-menu/handburger-menu.component';
import { CardComponent } from './components/card/card.component';
import { HeaderNavService } from './services/header-nav.service';
import { FirebaseAppService } from './services/firebase-app.service';
import { AlertComponent } from './components/alert/alert.component';
import { OverlayService } from './services/overlay.service';
import { AdminGuard } from './aguards/admin.guard';
import { CarousellComponent } from './components/carousell/carousell.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [HandburgerMenuComponent, CardComponent, AlertComponent,  CarousellComponent, ProductListComponent],
  imports: [CommonModule],
  exports: [HandburgerMenuComponent, CardComponent, AlertComponent,CarousellComponent,ProductListComponent],
  providers: [HeaderNavService, FirebaseAppService, OverlayService,AdminGuard],
})
export class SharedModule {}
