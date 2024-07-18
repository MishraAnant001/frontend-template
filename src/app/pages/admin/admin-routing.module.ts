import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"manage-users",
    pathMatch:"full"
  },
  {
    path:"manage-users",
    component:ManageUsersComponent
  },
  {
    path:"manage-accounts",
    component:ManageAccountsComponent
  },
  {
    path:"view-transactions",
    component:ViewTransactionsComponent
  },
  {
    path:"view-user",
    component:ViewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
