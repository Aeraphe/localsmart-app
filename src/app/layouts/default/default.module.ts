import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/layouts/default/header/header.component';



@NgModule({
  declarations: [DefaultComponent,HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DefaultModule { }
