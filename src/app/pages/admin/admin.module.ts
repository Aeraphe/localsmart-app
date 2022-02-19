import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UploadManagerComponent } from './upload-manager/upload-manager.component';
import { RouterModule } from '@angular/router';
import { UploadTaskComponent } from './upload-task/upload-task.component';



@NgModule({
  declarations: [AdminComponent,UploadManagerComponent, UploadTaskComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminModule { }
