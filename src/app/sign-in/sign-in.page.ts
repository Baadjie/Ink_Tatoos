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

  constructor(public modalController : ModalController) { }

  ngOnInit() {
  }

  login(){
   firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {

    this.modalController.dismiss({
      'dismissed': true
    });

   }).catch(error => {
    this.modalController.dismiss({
      'dismissed': true
    });
   })
  }

  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
