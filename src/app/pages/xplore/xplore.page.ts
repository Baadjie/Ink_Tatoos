import { SignInPage } from './../../sign-in/sign-in.page';
import { BookingModalPage } from './../../booking-modal/booking-modal.page';
import { DeliverDataService } from './../../deliver-data.service';
import { RegisterPage } from './../../register/register.page';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, AlertController } from '@ionic/angular';






@Component({
  selector: 'app-xplore',
  templateUrl: './xplore.page.html',
  styleUrls: ['./xplore.page.scss'],
})


export class XplorePage implements OnInit {




  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:''
    
  }
  db = firebase.firestore();
  Tattoos = [];
  MyValue: boolean;
  MyValue1: boolean;
  num: number;
  docId: string;

  query: any[];

  Design = [];


  Sketch = [];
  PreviouseWork = [];
  porpular = []

  showProfile1 : boolean = false;

  constructor(public DeliverDataService : DeliverDataService,  public modalController: ModalController, public alertCtrl: AlertController) {

   }

  
   
 

  ngOnInit() {
    
    this.db.collection("Tattoo").onSnapshot(data => {
      data.forEach(item => {
        if(item.exists){
          if(item.data().categories === "Sketch/design"){
            
           this.Sketch.push(item.data());
           console.log("11111111111111111",this.Sketch);
          }
        }
      })
    })


    this.db.collection("Tattoo").onSnapshot(data => {
      data.forEach(item => {
        if(item.exists){
          if(item.data().categories === "Previous work"){
            
           this.PreviouseWork.push(item.data());
           console.log("11111111111111111",this.PreviouseWork);
          }
        }
      })
    })


    this.db.collection("Tattoo").onSnapshot(data => {
      data.forEach(item => {
        if(item.exists){
          if(item.data().categories === "Sketch/design"){
            
           this.porpular.push(item.data());
           console.log("11111111111111111",this.Sketch);
          }
        }
      })
    })
            
}

async CreateAccount(){

  let modal = await this.modalController.create({
    component : RegisterPage
  })
  return await modal.present();

}


async Login(){

  let modal = await this.modalController.create({
    component : SignInPage
  })
  return await modal.present();

}

logOut(){

  firebase.auth().signOut().then(user => {
    console.log("Logged out successfully");
  }).catch(error => {
    console.log("Something went wrong");
    
  })
}

 async Booking(tattoo){

    if(firebase.auth().currentUser){

      console.log("Your data ", tattoo);
      console.log("Your uid here is ", firebase.auth().currentUser.uid);
      console.log("Your email here is ", firebase.auth().currentUser.email);
      // this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).collection("Requests").doc().set({
      //   name : "Simon",
      //   surname : "Cowel",
      //   legnth : "153",
      //   breadth : "353"
      // })

      this.DeliverDataService.dataSaved.category = tattoo.categories;
      this.DeliverDataService.dataSaved.description = tattoo.description;
      this.DeliverDataService.dataSaved.image = tattoo.image;
      this.DeliverDataService.dataSaved.name = tattoo.name;
      this.DeliverDataService.dataSaved.priceRange = tattoo.pricerange;

      console.log("Your data in the service",  this.DeliverDataService.dataSaved);

      const modal = await this.modalController.create({
        component: BookingModalPage
      });
      return await  modal.present();


    }else{

      console.log("Sorry no user here");
      const modal = await this.modalController.create({
        component: RegisterPage
      });
      return await  modal.present();
      
    }
    

   
  
    
  }


  pb(){


  }

  obj = {id: null, obj : null}


  ionViewWillEnter(){
    
    let firetattoo = {
      docid: '',
      doc: {}
    }
   

  

    // this.db.collection('Tattoo').onSnapshot(data => {
    //   this.Tattoos = [];
    
    //   data.forEach(item => {
    //     firetattoo.doc = item.data();
    //     firetattoo.docid = item.id;
    //     this.Tattoos.push(firetattoo)

      

    //      firetattoo = {
    //       docid: '',
    //       doc: {}
    //     }
    //   })

    //   console.log("Your tattoos ",  this.Tattoos );
      
      
    // })

  }

}
