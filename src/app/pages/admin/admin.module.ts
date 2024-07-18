import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ViewUserComponent } from './view-user/view-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageUsersComponent,
    ManageAccountsComponent,
    ViewTransactionsComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
