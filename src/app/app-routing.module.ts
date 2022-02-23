import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { UploadManagerComponent } from './pages/admin/upload-manager/upload-manager.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AdminGuard } from './shared/aguards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product-details/:?p', component: ProductDetailsComponent},
      { path: 'login', component: LoginComponent },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate:[AdminGuard],
        children: [
          { path: 'product-add', component: UploadManagerComponent },
          { path: 'product-list', component: ProductListComponent },
        ],
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
