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
      { path: 'home',data:{info:'Home'}, component: HomeComponent },
      { path: 'product-details/:id',data:{info:'Produto'}, component: ProductDetailsComponent},
      { path: 'login',data:{info:'Login'}, component: LoginComponent },
      {
        path: 'admin',data:{info:'Administração'},
        component: AdminComponent,
        canActivate:[AdminGuard],
        children: [
          { path: 'product-add',data:{info:'Adicionar Produto'}, component: UploadManagerComponent },
          { path: 'product-list',data:{info:'Lista de Produtos'}, component: ProductListComponent },
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
