import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces';
import { DataExchangeService, UserService } from 'src/app/core/services';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  userData!: IUser[]
  cols!: Column[];
  exportColumns!: ExportColumn[];
  constructor(private service: UserService, private confirmationService: ConfirmationService, private _toastService: ToastService, private dataService: DataExchangeService, private router: Router) { }
  ngOnInit(): void {

    this.getUsers()

    this.cols = [
      { field: '_id', header: 'userid', },
      { field: 'name', header: 'name' },
      { field: 'email', header: 'email' },
      { field: 'dob', header: 'dob' },
      { field: 'phone', header: 'phone' },
      { field: 'address', header: 'address' }
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  getUsers() {
    this.service.getAllUsers().subscribe({
      next: (response: any) => {
        // console.log(response);
        this.userData = response.data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('p', 'px', 'a3');
        const tableData = this.userData.map((user) => [
          user._id,
          user.name,
          user.email,
          user.dob,
          user.phone,
          user.address
        ]);

        autoTable(doc, {
          head: [this.exportColumns.map(col => col.title)],
          body: tableData as any
        });

        doc.save('users.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.userData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'products');
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

  deleteUser(userid: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteUser(userid).subscribe({
          next: (response) => {
            console.log(response);
            this._toastService.success('User deleted successfully');
            this.getUsers()
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    });
  }

  viewUser(userid: string) {
    this.dataService.setData(userid)
    this.router.navigateByUrl("/admin/view-user")
  }

}
