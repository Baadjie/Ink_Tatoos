import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {


  email = "";
  password = "";
  showProfile: boolean;

  constructor(public modalController : ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    
  }

  login(){


    //

    const {email,password}=this
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {

      console.log("Logged in succesful")
      

         this.modalController.dismiss({
  
           'dismissed': true

    
         }).catch((error) => {
    console.log("User not found")
     let errorCode = error.code;
     let errorMessage = error.message;
 
    });




    //



  //  firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {

  //   this.modalController.dismiss({
  
  //     'dismissed': true
  //   });

  //  }).catch(error => {
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  //  })
  // })
}
    );
}}
