import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UploadManagerComponent } from './upload-manager/upload-manager.component';
import { RouterModule } from '@angular/router';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AdminComponent,UploadManagerComponent, UploadTaskComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
