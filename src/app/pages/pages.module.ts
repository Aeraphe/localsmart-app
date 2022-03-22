import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    ProductDetailsComponent,
    ProductListPageComponent,
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
})
export class PagesModule {}
