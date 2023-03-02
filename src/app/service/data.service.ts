import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable()


export class DataService {

  private btnLogout = new BehaviorSubject<boolean>(false);
  showLogout = this.btnLogout.asObservable();

  constructor() { }

  userStatus(show : boolean){
    this.btnLogout.next(show)
  }
}
