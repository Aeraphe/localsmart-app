import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    PagesModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
