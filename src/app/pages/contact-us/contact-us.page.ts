import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { SignInPage } from 'src/app/sign-in/sign-in.page';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {


  Contact = [];
  db = firebase.firestore();
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    
    let firetattoo = {
      docid: '',
      doc: {}
    }
   

    this.db.collection('Admin').onSnapshot(data => {
      this.Contact = [];
      //console.log('tt',this.Tattoos);
      data.forEach(item => {
        firetattoo.doc = item.data();
        firetattoo.docid = item.id;
        

        this.Contact.push(firetattoo)

        //console.log('all',this.Tattoos);

         firetattoo = {
          docid: '',
      
          doc: {}
        }
      })

      
      console.log("Contact US ",  this.Contact );
      
      
    })

  }



  async Login(){

 
 

    let modal = await this.modalController.create({
      component : SignInPage,
    })
    
   // this.showProfile();
    return await modal.present();
  



}

}
