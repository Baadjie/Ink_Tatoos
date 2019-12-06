import { XplorePage } from './../pages/xplore/xplore.page';
import { DeliverDataService } from './../deliver-data.service';

import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';






@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  db = firebase.firestore();
  counter : number = 0;
  email = "";
  password = "";
  AcceptedData = [];

  constructor(public modalController : ModalController, public Router : Router,  public DeliverDataService : DeliverDataService) { }

  ngOnInit() {
  }


  login(){

   firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {

    console.log("=========================");
    if(firebase.auth().currentUser){

      this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).collection("Requests").get().then(i => {
        i.forEach(a => {

         if(a.data().bookingState === "Accepted"){   
          this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).collection("Response").get().then(myItem => {       
            myItem.forEach(doc => {
              if(doc.data().bookingState === "Pending"){
                this.DeliverDataService.AcceptedData = [];
                this.DeliverDataService.AcceptedData.push(doc.data())
                // console.log("@@@@@@@@@", this.DeliverDataService.AcceptedData);
              }   
            })
        
      })
      // return true; 
         }
        
        })
      })
    }

    this.Router.navigateByUrl('/xplore')

   }).catch(error => {

    this.modalController.dismiss({
      'dismissed': true
    });

   })

   this.modalController.dismiss({
    'dismissed': true
  });




  }

  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
