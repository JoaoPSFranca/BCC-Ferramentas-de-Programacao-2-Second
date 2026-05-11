import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected isLogged: Boolean = false;

  public login(){
    this.isLogged = !this.isLogged;
  }

  public getLogged() {
    return this.isLogged;
  }
}
