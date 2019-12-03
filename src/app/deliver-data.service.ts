import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliverDataService {

  showProfile : boolean = false;

  dataSaved = {
    category : "",
    description : "",
    image : "",
    priceRange : "",
    name : ""
  }

  constructor() { }
}
