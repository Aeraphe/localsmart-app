import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/layouts/default/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [DefaultComponent,HeaderComponent, MobileNavComponent, WhatsappComponent, SearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class DefaultModule { }
