import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import {  ITransaction } from 'src/app/core/interfaces';
import { AccountService } from 'src/app/core/services';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  transactions!: ITransaction[]
  exportColumns!: ExportColumn[];
  cols!: Column[];
  accounts!: string[]
  constructor(private service: AccountService, private toastService: ToastService) { }
  ngOnInit(): void {
    this.getAccounts()
    this.getTransactions()
    this.cols = [
      { field: '_id', header: 'transaction id', },
      { field: 'reciever_account', header: 'reciever account' },
      { field: 'receiver_name', header: 'receiver name' },
      { field: 'sender_account', header: 'sender account' },
      { field: 'sender_name', header: 'sender name' },
      { field: 'amount', header: 'amount' },
      { field: 'type', header: 'transaction type' },
      { field: 'remaining_balance', header: 'remaining balance' },
      { field: 'description', header: 'description' },
      { field: 'createdAt', header: 'transaction date' },
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('p', 'px', 'a3');
        const tableData = this.transactions.map((transaction) => [
          transaction._id,
          transaction.reciever_account,
          transaction.receiver_name,
          transaction.sender_account,
          transaction.sender_name,
          transaction.amount,
          transaction.type,
          transaction.remaining_balance,
          transaction.description,
          new Date(transaction.createdAt),
        ]);

        autoTable(doc, {
          head: [this.exportColumns.map(col => col.title)],
          body: tableData as any
        });

        doc.save('transaction-history.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.transactions.map((transaction:ITransaction)=>{
        return {
          _id:transaction._id,
          reciever_account:transaction.reciever_account,
          receiver_name:transaction.receiver_name,
          sender_account:transaction.sender_account,
          sender_name:transaction.sender_name,
          amount:transaction.amount,
          type:transaction.type,
          date:`${new Date(transaction.createdAt)}`,
          remaining_balance:transaction.remaining_balance,
          description:transaction.description,
        }
      }));
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'transaction-history');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  getTransactions() {
    this.service.getHistory().subscribe({
      next: (response: any) => {
        // console.log(response);
        const data:ITransaction[]= response.data
        data.forEach((transaction:ITransaction)=>{
          if(transaction.type=='transfer'){
            if(this.accounts.includes(transaction.sender_account)){
              transaction.remaining_balance=transaction.sender_remaining_balance
            }else{
              transaction.remaining_balance=transaction.reciever_remaining_balance
            }
          }else{
            transaction.remaining_balance=transaction.sender_remaining_balance
          }
        })
        this.transactions=data
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

  getAccounts(){
    this.service.getAccount().subscribe({
      next:(response:any)=>{
        // console.log(response);
        if(Array.isArray(response.data)){
          this.accounts=response.data.map((item:any)=>item.account_number)
        }
        // console.log(this.accounts);
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
