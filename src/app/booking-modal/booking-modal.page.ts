import { SuccessPagePageModule } from './../success-page/success-page.module';
import { DeliverDataService } from './../deliver-data.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SuccessPagePage } from '../success-page/success-page.page';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.page.html',
  styleUrls: ['./booking-modal.page.scss'],
})
export class BookingModalPage implements OnInit {


    Length : number ;
    Breadth : number;



    category = "" 
    description = "" 
    image = "" 
    priceRange = "" 
    name = ""
  
    Cname = "";
    db = firebase.firestore()
    tattooForm : FormGroup;
    validation_messages = {
      'Length': [
        { type: 'required', message: 'Length  is required.' },
  
      ],
      'Breadth': [
        { type: 'required', message: 'Breadth  is required.' },
  
      ],
    }
        

  constructor(public DeliverDataService: DeliverDataService,private fb: FormBuilder, private modalController: ModalController) { 
  this.tattooForm = this.fb.group({
    Length: new FormControl('', Validators.compose([Validators.required])),
    Breadth: new FormControl('', Validators.compose([Validators.required])),
  })
}
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
 
    if (this.tattooForm.valid ) {
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
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
