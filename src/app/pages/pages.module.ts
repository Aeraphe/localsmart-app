import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [HomeComponent, NotFoundComponent, LoginComponent,  ],
  imports: [CommonModule,SharedModule,AdminModule],
})
export class PagesModule {}
