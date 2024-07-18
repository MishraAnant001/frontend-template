import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { IAccount, ITransaction, IUser } from 'src/app/core/interfaces';
import { AccountService, DataExchangeService, TransactionsService, UserService } from 'src/app/core/services';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userid!: string
  userData!: IUser
  isReceived = false
  isTransReceived = false
  accounts!: IAccount[]
  transactions!: ITransaction[]
  constructor(private dataService: DataExchangeService, private userService: UserService, private accountService: AccountService, private location: Location, private transService: TransactionsService, private toastService: ToastService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.userid = this.dataService.getData()
    if (!this.userid) {
      this.location.back()
      return
    }
    this.loadData()


  }
  loadData() {
    forkJoin([this.userService.getUserById(this.userid), this.accountService.getAccountByUser(this.userid)]).subscribe({
      next: (response: any) => {
        // console.log(response);
        this.userData = response[0].data
        this.accounts = response[1].data
        this.isReceived = true
      },
      error: (error) => {
        if (error.error) {
          this.toastService.error(error.error.message)
        } else {
          this.toastService.error(error.message)
        }
      }
    })
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteAccount(id).subscribe({
          next: (response) => {
            // console.log(response);
            this.toastService.success("Account deleted successfully")
            this.loadData()
          },
          error: (error) => {
            // console.log(error);
            if (error.error) {
              this.toastService.error(error.error.message)
            } else {
              this.toastService.error(error.message)
            }
          }
        })
      }
    });
  }
  showTransaction(id: string) {
    this.transService.getTransaction(id).subscribe({
      next: (response: any) => {
        this.isTransReceived = true
        this.transactions = response.data
      },
      error: (error) => {
        this.isTransReceived = false
        if (error.error) {
          this.toastService.error(error.error.message)
        } else {
          this.toastService.error(error.message)
        }
      }
    })
  }
}
