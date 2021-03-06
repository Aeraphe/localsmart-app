import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { ProductWhaListComponent } from './pages/admin/product-wha-list/product-wha-list.component';
import { StoreComponent } from './pages/admin/store/store.component';
import { UploadManagerComponent } from './pages/admin/upload-manager/upload-manager.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { AdminGuard } from './shared/aguards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'home', data: { info: 'Home' }, component: HomeComponent },
      {
        path: 'product-list-page/:cat',
        component: ProductListPageComponent,
      },
      {
        path: 'search-result/:id',
        data: { info: 'Resultado' },
        component: SearchResultComponent,
      },
      {
        path: 'product-details/:id',
        data: { info: 'Detalhes do Produto' },
        component: ProductDetailsComponent,
      },
      { path: 'login', data: { info: 'Login' }, component: LoginComponent },
      {
        path: 'admin',
        data: { info: 'Administração' },
        component: AdminComponent,
        canActivate: [AdminGuard],

        children: [
          {
            path: 'store',
            data: { info: 'Dados da Loja' },
            component: StoreComponent,
          },
          {
            path: 'product-add',
            data: { info: 'Adicionar Produto' },
            component: UploadManagerComponent,
          },
          {
            path: 'product-list',
            data: { info: 'Lista de Produtos' },
            component: ProductListComponent,
          },
          {
            path: 'product-wha-list',
            data: { info: 'Lista Whatsapp' },
            component: ProductWhaListComponent,
          },
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
