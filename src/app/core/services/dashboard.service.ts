import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private userApi = "http://localhost:8000/api/v1/dashboard/user"
  private adminApi = "http://localhost:8000/api/v1/dashboard/admin"
  constructor(private http:HttpClient) { }

  getUserData(){
    return this.http.get(this.userApi)
  }
  getAdminData(){
    return this.http.get(this.adminApi)
  }
}
