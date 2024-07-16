import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signupApi = "http://localhost:8000/api/v1/user/signup"
  private loginApi = "http://localhost:8000/api/v1/user/login"
  private getApi = "http://localhost:8000/api/v1/user/"
  constructor(private http: HttpClient) { }

  signupUser(data: IUser) {
    return this.http.post(this.signupApi, data, { observe: "response" })
  }
  loginUser(data:{email:string,password:string,remember:boolean}) {
    return this.http.post(this.loginApi, data, { observe: "response" })
  }
  getAllUsers(){
    return this.http.get(this.getApi)
  }
  deleteUser(id:string){
    return this.http.delete(this.getApi+id)
  }
}
