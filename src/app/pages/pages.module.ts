import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
  
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ChartModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
