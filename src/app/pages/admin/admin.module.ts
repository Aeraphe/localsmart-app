import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UploadManagerComponent } from './upload-manager/upload-manager.component';
import { RouterModule } from '@angular/router';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ProductUpdateComponent } from './product-list/product-update/product-update.component';
import { ProductWhaListComponent } from './product-wha-list/product-wha-list.component';
import { StoreComponent } from './store/store.component';
import { ChangePriceComponent } from './product-wha-list/change-price/change-price.component';

@NgModule({
  declarations: [
    AdminComponent,
    UploadManagerComponent,
    UploadTaskComponent,
    ProductListComponent,
    ProductUpdateComponent,
    ProductWhaListComponent,
    StoreComponent,
    ChangePriceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
