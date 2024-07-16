import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataResolver implements Resolve<any> {
  resolve(): Observable<any> {
    // Return an Observable that represents the API request(s) you want to
    // execute before the route is activated.
  }
}