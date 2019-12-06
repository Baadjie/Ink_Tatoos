import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DeliverDataService } from 'src/app/deliver-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private DeliverDataService: DeliverDataService,private rout: Router) { }


  loader = true;
  User=[];

  email: string;

  Requests=[];

  Response=[];

  userID :string;

  
  
  db = firebase.firestore();

  ngOnInit() {
  }

  logout(){
    this.loader = true;
    this.DeliverDataService.logoutUser().then(()=>{
      this.rout.navigateByUrl('xplore');
      setTimeout(() => {
        this.loader = false;
      }, 4000);
    })
    }

  
  ionViewWillEnter(){

      
    if(firebase.auth().currentUser){

    //  console.log("Your  pb data ", Bookings);
      console.log("Your pb here is ", firebase.auth().currentUser.uid);
      console.log("Your email here is ", firebase.auth().currentUser.email);
     // this.User.push(item.data());







        
        //User's details
          this.email=firebase.auth().currentUser.email;

          this.db.collection("Bookings").onSnapshot(data => {         
            data.forEach(item => {
              if(item.exists){
                if(item.data().email === this.email){
                  
                  this.User.push(item.data());
                  console.log("Testing",this.User);
                }
              }
            })
          })
        
        //request  
      this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).collection("Requests").get().then(data => {
        data.forEach(i => {
          console.log("ewewew ", i.data());
          this.Requests.push(i.data());

          
        })
      })
      
      //response




  
      // this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).collection("Response").get().then(data => {
      //   data.forEach(i => {
      //     console.log("Response ", i.data());

      //     this.Response.push(i.data());
          
      //   })
      // })

    

      
  }





}
}

