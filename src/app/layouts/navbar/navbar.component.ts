import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ConfirmationService } from 'primeng/api';
import { StorageService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private service: StorageService, private confirmationService: ConfirmationService, private _toastService: ToastService) { }
  user = this.service.getName()
  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._toastService.success("user logged out successfully");
        this.service.clear();
        this.router.navigateByUrl("/auth")
      }
    });
  }
}
