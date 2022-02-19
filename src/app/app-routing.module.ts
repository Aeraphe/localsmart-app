import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UploadManagerComponent } from './pages/admin/upload-manager/upload-manager.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path:"",redirectTo:"home", pathMatch:'full'},
  {path:"", component:DefaultComponent, children:[
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'admin', component:AdminComponent,children:[
      {path:'upload-manager',component:UploadManagerComponent}
    ]}
  ]},

  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
