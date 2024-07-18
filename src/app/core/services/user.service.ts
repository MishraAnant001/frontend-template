import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = "http://localhost:8000/api/v1/user/"
  constructor(private http: HttpClient) { }

  signupUser(data: IUser) {
    return this.http.post(this.api+"/signup", data, { observe: "response" })
  }
  loginUser(data:{email:string,password:string,remember:boolean}) {
    return this.http.post(this.api+"/login", data, { observe: "response" })
  }
  getAllUsers(){
    return this.http.get(this.api)
  }
  deleteUser(id:string){
    return this.http.delete(this.api+id)
  }
  getUserById(userid:string){
    return this.http.get(this.api+userid)
  }
}
