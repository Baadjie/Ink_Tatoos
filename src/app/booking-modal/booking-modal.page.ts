import { SuccessPagePageModule } from './../success-page/success-page.module';
import { DeliverDataService } from './../deliver-data.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SuccessPagePage } from '../success-page/success-page.page';




@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.page.html',
  styleUrls: ['./booking-modal.page.scss'],
})
export class BookingModalPage implements OnInit {


    Length : number = 0;
    Breadth : number = 0;



    category = "" 
    description = "" 
    image = "" 
    priceRange = "" 
    name = ""
  
    Cname = "";
    db = firebase.firestore()



  constructor(public DeliverDataService: DeliverDataService, private modalController: ModalController) { }

  ngOnInit() {

    this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).get().then(data => {
      this.Cname = data.data().name;  
    })

   

  }

  ionViewWillEnter(){
    
    this.category = this.DeliverDataService.dataSaved.category ;
    this.description = this.DeliverDataService.dataSaved.description  ;
    this.image = this.DeliverDataService.dataSaved.image  ;
    this.name = this.DeliverDataService.dataSaved.name  ;
    this.priceRange = this.DeliverDataService.dataSaved.priceRange  ;

  
    console.log("Data in the booking modal" ,  this.description );

  }

  senBookig(){
 
    this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).collection("Requests").doc().set({


      category : this.category,
      description : this.description,
      image : this.image,
      priceRange :  this.priceRange,
      tattoName: this.name,
      breadth : this.Breadth,
      length : this.Length,
      email : firebase.auth().currentUser.email,
      uid : firebase.auth().currentUser.uid,
      customerName : this.Cname,
      bookingState : 'waiting'


    }).then( async() => {

      console.log("Sorry no user here");
      const modal = await this.modalController.create({
        component: SuccessPagePage
      });
      return await  modal.present();

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
