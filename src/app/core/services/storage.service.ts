import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  setToken(token:string,remember:boolean){
    if(!remember){
      sessionStorage.setItem("token",token)
    }else{
      localStorage.setItem("token",token)
    }
  }

  getToken(){
    return sessionStorage.getItem("token") || localStorage.getItem("token")
  }

  setRole(role:string){
    localStorage.setItem("role",window.btoa(role))
  }

  getRole(){
    return window.atob(localStorage.getItem("role")!)
  }

  setName(name:string){
    localStorage.setItem("name",window.btoa(name))
  }

  getName(){
    return window.atob(localStorage.getItem("name")!)
  }

  setUser(user:IUser){
    localStorage.setItem("user",window.btoa(JSON.stringify(user)))
  }
  getUser(){
    return JSON.parse(window.atob(localStorage.getItem("user") as string))
  }

  clear(){
    sessionStorage.clear()
    localStorage.clear()
  }
}
