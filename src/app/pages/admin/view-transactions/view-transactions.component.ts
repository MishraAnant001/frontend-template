import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { checkFutureDate } from 'src/app/core/custom-validators';
import { ITransaction } from 'src/app/core/interfaces';
import { TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss']
})
export class ViewTransactionsComponent implements OnInit {
  transactions!: ITransaction[]
  filterForm!: FormGroup
  submitted = false
  constructor(private transService: TransactionsService, private toastService: ToastService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', checkFutureDate()]
    })
    this.getTransactions()
  }
  get f() {
    return this.filterForm.controls
  }
  onSubmit() {
    this.submitted = true
    if (this.filterForm.valid) {
      if (this.f['end_date'].value == "") {

        let currentDate = new Date();

        // Get year, month, and day from the Date object
        let year = currentDate.getFullYear();
        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based index
        let day = ('0' + currentDate.getDate()).slice(-2);

        // Construct the desired date format 'YYYY-MM-DD'
        let formattedDate = `${year}-${month}-${day}`;
        this.f['end_date'].setValue(formattedDate)
      }
      console.log(this.filterForm.value);
    }
  }
  getTransactions() {
    this.transService.getAllTransactions().subscribe({
      next: (response: any) => {
        // console.log(response);  
        this.transactions = response.data
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

}
