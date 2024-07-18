import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransactionNew } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private api ="http://localhost:8000/api/v1/transaction/"
  constructor(private http:HttpClient) { }

  getTransaction(id:string){
    return this.http.get(this.api+id)
  }

  getAllTransactions(){
    return this.http.get(this.api)
  }

  createTransaction(data:ITransactionNew){
    return this.http.post(this.api,data)
  }
}
