import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DisplayComponent } from './display/display.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DisplayComponent,
    AuthLayoutComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule
  ]
})
export class LayoutsModule { }
