import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITransactionNew } from 'src/app/core/interfaces';
import { DataExchangeService } from 'src/app/core/services';

@Component({
  selector: 'app-view-recent-transaction',
  templateUrl: './view-recent-transaction.component.html',
  styleUrls: ['./view-recent-transaction.component.scss']
})
export class ViewRecentTransactionComponent implements OnInit{
  transData!:ITransactionNew
  constructor(private dataService:DataExchangeService,private location:Location){}
  ngOnInit(): void {
    this.transData=this.dataService.getData()
    if(!this.transData){
      this.location.back()
      return
    }
  }

}
