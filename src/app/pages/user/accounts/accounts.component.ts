import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { ConfirmationService } from 'primeng/api';
import { IAccount, ITransaction } from 'src/app/core/interfaces';
import { AccountService, TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit{
  @ViewChild("btn") btn!:ElementRef
  accounts: IAccount[]=[] 
  isTransReceived=false
  submitted=false
  accountTypes:string[]=[]
  accountForm!:FormGroup
  transactions!:ITransaction[]
  constructor(private accountService: AccountService,private toastService:ToastService,private transService :TransactionsService,private fb:FormBuilder,private confirmationService:ConfirmationService){}
  ngOnInit(): void {
    this.accountForm=this.fb.group({
      account_type:['',Validators.required],
      balance:['',[Validators.required,Validators.min(1000)]]
    })
    this.getAccounts()
  }

  get f(){
    return this.accountForm.controls
  }

  onSubmit(){
    this.submitted=true
    // console.log(this.accountForm.controls);
    if(this.accountForm.valid){
      this.accountService.createAccount(this.accountForm.value).subscribe({
        next:(response)=>{
          // console.log(response);
          this.toastService.success("account created successfully")
          this.getAccounts()
          this.btn.nativeElement.click()
        },
        error:(error)=>{
          // console.log(error);
          if(error.error){
            this.toastService.error(error.error.message)
          }else{
            this.toastService.error(error.message)
          }
        }
      })
    }
  }
  
  onDelete(id:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteAccount(id).subscribe({
          next:(response)=>{
            console.log(response);
            this.toastService.success("Account deleted successfully")
            this.getAccounts()
          },
          error:(error)=>{
            // console.log(error);
            if(error.error){
              this.toastService.error(error.error.message)
            }else{
              this.toastService.error(error.message)
            }
          }
        })
      }
    });
  }

  getAccounts(){
    this.accountService.getAccount().subscribe({
      next:(response:any)=>{
        // console.log(response);
        this.accounts=response.data
        this.accountTypes=this.accounts.map((item:IAccount)=>item.account_type)
        console.log(this.accountTypes);
      },
      error:(error)=>{
        // console.log(error);
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
