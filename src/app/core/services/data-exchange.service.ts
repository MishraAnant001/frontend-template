import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  private data:any
  constructor() { }

  setData(recievedData:any){
    this.data=recievedData
  }
  getData(){
    return this.data
  }
}
