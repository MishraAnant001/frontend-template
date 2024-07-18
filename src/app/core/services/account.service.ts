import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private api= "http://localhost:8000/api/v1/account/"
  constructor(private http:HttpClient) { }

  getAccountByUser(userid:string){
    return this.http.get(this.api+"getbyadmin/"+userid)
  }

  getAccount(){
    return this.http.get(this.api+"user")
  }

  getAllAccounts(){
    return this.http.get(this.api)
  }

  createAccount(data:{account_type:string,balance:number}){
    return this.http.post(this.api,data)
  }

  deleteAccount(id:string){
    return this.http.delete(this.api+id)
  }

  getHistory(){
    return this.http.get(this.api+"transaction-history")
  }
}
