import { SignInPage } from './../sign-in/sign-in.page';
import { DeliverDataService } from './../deliver-data.service';
import { Component, OnInit } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewController } from '@ionic/core';
import { ModalController, ActionSheetController } from '@ionic/angular';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  name = '';
  email = '';
  password = '';
  db=firebase.firestore();
  number : number ;


  constructor(public DeliverDataService : DeliverDataService,  private modalController: ModalController, public actionSheetController: ActionSheetController, private fb: FormBuilder) { }

  ngOnInit() {
 
  }

  register(){

  

    
  

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Email already exist");
      
      // ...
    }).then(() => {

      this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).set({
        name : this.name,
        email : this.email,
        number : this.number
      })
           console.log("Logged in");
       

console.log("1111111111111111111111", firebase.auth().currentUser.email);


           this.modalController.dismiss({
            'dismissed': true
          });
    });


  }

  async SignIn(){

     this.modalController.dismiss({
      'dismissed': true
    });



    let modal = await this.modalController.create({
      component : SignInPage
    });
    return await modal.present();

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
