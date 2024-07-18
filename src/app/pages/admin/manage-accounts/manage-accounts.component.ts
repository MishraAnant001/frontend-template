import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { IAccount, ITransaction } from 'src/app/core/interfaces';
import { AccountService, TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {
  accounts!: IAccount[]
  isTransReceived=false
  transactions!:ITransaction[]
  constructor(private accountService: AccountService,private toastService:ToastService,private transService :TransactionsService){}
  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts(){
    this.accountService.getAllAccounts().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.accounts=response.data
      },
      error:(error)=>{
        if(error.error){
          this.toastService.error(error.error.message)
        }else{
          this.toastService.error(error.message)
        }
      }
    })
  }

  showTransaction(id:string){
    this.transService.getTransaction(id).subscribe({
      next:(response:any)=>{
        this.isTransReceived=true
        this.transactions=response.data
      },
      error:(error)=>{
        this.isTransReceived=false
        if(error.error){
          this.toastService.error(error.error.message)
        }else{
          this.toastService.error(error.message)
        }
      }
    })
  }

}
