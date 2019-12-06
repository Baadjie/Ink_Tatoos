import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliverDataService {


  notifications : number = 0;

  dataSaved = {
    category : "",
    description : "",
    image : "",
    priceRange : "",
    name : ""
  }

  AcceptedData =  [];

  constructor() {
    this.notifications = this.AcceptedData.length;
   }
}
