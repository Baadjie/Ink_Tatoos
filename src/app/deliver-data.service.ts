import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DeliverDataService {

  showProfile : boolean = false;

  logout :boolean =false;

  get isLoggedIn() {
    
    return true;
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  dataSaved = {
    category : "",
    description : "",
    image : "",
    priceRange : "",
    name : ""
  }

  constructor() { }
}
