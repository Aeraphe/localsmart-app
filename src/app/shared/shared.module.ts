import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HandburgerMenuComponent } from './components/handburger-menu/handburger-menu.component';
import { CardComponent } from './components/card/card.component';
import { HeaderNavService } from './services/header-nav.service';
import { FirebaseAppService } from './services/firebase-app.service';
import { AlertComponent } from './components/alert/alert.component';
import { OverlayService } from './services/overlay.service';
import { AdminGuard } from './aguards/admin.guard';
import { CarousellComponent } from './components/carousell/carousell.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [HandburgerMenuComponent, CardComponent, AlertComponent,  CarousellComponent, ProductListComponent, LoaderComponent],
  imports: [CommonModule,RouterModule],
  exports: [HandburgerMenuComponent, CardComponent, AlertComponent,CarousellComponent,ProductListComponent,LoaderComponent],
  providers: [HeaderNavService, FirebaseAppService, OverlayService,AdminGuard,CurrencyPipe],
})
export class SharedModule {}
