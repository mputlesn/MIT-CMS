import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
declare var firebase;

@Injectable({
  providedIn: 'root'
})
export class MitService {

  constructor() { }

  register(email, password, name) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        // tslint:disable-next-line:prefer-const
        let uid: any = firebase.auth().currentUser.uid;
        firebase.database().ref('admins/' + uid).set({
          name: name,
          email: email,
          propic: "../../../assets/propic.png",
          
        });

        
        let user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function(a) {
          console.log(a);
          
        
        }).catch(function(error) {
        // An error happened.
        });


        resolve();

      }, (error) => {
        reject(error);
      });


    });
  }

  forgetPassword(email) {

    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email) .then(() => {
              
              resolve();
      } , (error) => {
        reject(error);
  
      });
  
  });
  
  }

  loginx(email , password){
    return firebase.auth().signInWithEmailAndPassword(email, password) ;
  }

  signout() {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      // An error happened.
    });
  }



  oops(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,

    });
  }

  
  sucess(message) {
    Swal.fire({
      type: 'success',
      title: 'Successful',
      text: message,

    });
  }

  getAllCards(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('category/Cards').on('value',(data:any)=>{
        var cards = data.val() ;
        var keys:any =Object.keys(cards)
        var cardsInfo = []

        for (let i = 0; i < keys.length; i++) {
          var  k =keys[i];
          let obj = {
            k:k ,
            card:cards[k].message
          }

          cardsInfo.push(obj) ;
          console.log(cardsInfo);
          
        
        }
        resolve(cardsInfo)
      })
    })
  }


  addCard(card){
    return new Promise((resolve, reject) => {
      firebase.database().ref('category/Cards').push({
        message: card
      })
    })
  }

  deleteCard(id){
    return new Promise((resolve, reject) => {
      firebase.database().ref('category/Cards/'+id).remove()
    })
  }

}
