import { Component, OnInit } from '@angular/core';
import { DashboardService, StorageService } from 'src/app/core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private service: DashboardService, private storageService: StorageService) { }

  data: any;

  options: any;

  ngOnInit() {
    const isAdmin: boolean = this.storageService.getRole() == "admin"
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
    if (!isAdmin) {

      this.service.getUserData().subscribe({
        next: (response: any) => {
          // console.log(response);
          const keys = Object.keys(response.data)
          const values = Object.values(response.data)
          // console.log(keys);
          this.data = {
            labels: keys,
            datasets: [
              {
                data: values,
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          };

        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else{
      this.service.getAdminData().subscribe({
        next: (response: any) => {
          // console.log(response);
          const keys = Object.keys(response.data)
          const values = Object.values(response.data)
          // console.log(keys);
          this.data = {
            labels: keys,
            datasets: [
              {
                data: values,
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          };

        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }


}
