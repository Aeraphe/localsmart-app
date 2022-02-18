import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/layouts/default/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DefaultComponent,HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class DefaultModule { }
