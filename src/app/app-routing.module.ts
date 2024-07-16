import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './layouts/display/display.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guard/auth.guard';
import { loginGuard } from './core/guard/login.guard';

const routes: Routes = [
  {
    path:"",
    component:DisplayComponent,
    loadChildren:()=>import("./pages/pages.module").then((m)=>m.PagesModule),
    canActivate:[authGuard]
    
  },
  {
    path:"auth",
    component:AuthLayoutComponent,
    loadChildren:()=> import("./auth/auth.module").then((m)=>m.AuthModule),
    canActivate:[loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
