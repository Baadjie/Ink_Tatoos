import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {DatasavedService} from '../../datasaved.service'
import { Router } from '@angular/router';



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

  constructor(public DatasavedService : DatasavedService,public router : Router) {
    
   
  
   }

  
   
 

  ngOnInit() {


    this.db.collection("Tattoo").onSnapshot(data => {
      data.forEach(item => {
        if(item.exists){
          if(item.data().categories === "Sketch/design"){
            
           this.Design.push(item.data());
           console.log("11111111111111111",this.Design);
          }
        }
      })
    })

    

               
         

  }


  gotoBooking(tattoo){
    this.DatasavedService.tattoo = tattoo;
    this.router.navigateByUrl('/booking');
  }


  pb(){


  }

  obj = {id: null, obj : null}


  ionViewWillEnter(){
    
    let firetattoo = {
      docid: '',
      doc: {}
    }
   

    this.db.collection('Tattoo').onSnapshot(data => {
      this.Tattoos = [];
      //console.log('tt',this.Tattoos);
      data.forEach(item => {
        firetattoo.doc = item.data();
        firetattoo.docid = item.id;
        this.Tattoos.push(firetattoo)

        //console.log('all',this.Tattoos);

         firetattoo = {
          docid: '',
          doc: {}
        }
      })

      console.log("Your tattoos ",  this.Tattoos );
      
      
    })

  }

}
