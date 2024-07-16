import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private service :StorageService){}
  isAdmin:boolean = this.service.getRole() =="admin"
}
