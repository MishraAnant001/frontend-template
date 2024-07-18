import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewRecentTransactionComponent } from './view-recent-transaction/view-recent-transaction.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    AccountsComponent,
    FundTransferComponent,
    TransactionHistoryComponent,
    ViewRecentTransactionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class UserModule { }
