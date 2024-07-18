import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ViewRecentTransactionComponent } from './view-recent-transaction/view-recent-transaction.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"accounts",
    pathMatch:"full"
  },
  {
    path:"accounts",
    component:AccountsComponent
  },
  {
    path:"fund-transfer",
    component:FundTransferComponent
  },
  {
    path:"transaction-history",
    component:TransactionHistoryComponent
  },
  {
    path:"transaction-details",
    component:ViewRecentTransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
