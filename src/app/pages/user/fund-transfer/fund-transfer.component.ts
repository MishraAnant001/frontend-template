import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ConfirmationService } from 'primeng/api';
import { IAccount } from 'src/app/core/interfaces';
import { AccountService, DataExchangeService, TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent {
  accounts!: IAccount[]
  submitted=false
  accountForm!:FormGroup
  constructor(private accountService: AccountService,private toastService:ToastService,private transService :TransactionsService,private fb:FormBuilder,private router:Router,private dataService:DataExchangeService){}
  ngOnInit(): void {
    this.accountForm=this.fb.group({
      from_account:['',Validators.required],
      type:['',Validators.required],
      to_account:['',[Validators.required,Validators.pattern('[0-9]{14}')]],
      amount:['',[Validators.required,Validators.min(1)]],
      description:[''],
    })
    this.getAccounts()
  }

  get f(){
    return this.accountForm.controls
  }

  onSubmit(){
    this.submitted=true
    // console.log(this.accountForm.value);
    if(this.f['type'].value!='transfer'){
      this.f['to_account'].setValue(this.f['from_account'].value)
    }
    // console.log(this.accountForm.value);
    console.log(this.accountForm.controls);
    console.log(this.accountForm.valid);
    if(this.accountForm.valid){
      this.transService.createTransaction(this.accountForm.value).subscribe({
        next:(response:any)=>{
          console.log(response);
          this.toastService.success("transaction completed successfully")
          this.dataService.setData(response.data)
          this.router.navigateByUrl("/user/transaction-details")
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
  getAccounts(){
    this.accountService.getAccount().subscribe({
      next:(response:any)=>{
        // console.log(response);
        this.accounts=response.data
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
