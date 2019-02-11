import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
declare var firebase;

@Injectable({
  providedIn: 'root'
})
export class MitService {

  birthdayMessageArray = [] ;
  weddingMessageArray = [] ;
  babyShowerMessageArray = [] ;
  graduation = []
  anniversary = [] ;
  newJob = [] ;
  general = [] ;
  thinkingofyou = [] ;

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

  saveMessage(message, occassionType){
    
    firebase.database().ref('category/' + occassionType).push({

      message :message ,
      occasion:occassionType ,
   

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


delete(occassionType , key){
  return new Promise((resolve, reject)=>{
  
    
    
    
    firebase.database().ref("category/"+occassionType+"/"+key).remove();
  })
}


update(occassionType , key , message){
  return new Promise((resolve, reject)=>{
    console.log("category/"+occassionType+"/"+key);
    console.log("category/Wedding/-LYCR3t7ry_45iWHHj1u");
  firebase.database().ref("category/"+occassionType+"/"+key).update({
    message:message
  });
  })

}
getBirthdayMessages(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/Birthday").on('value', (data: any) => {

      var birthdayMessage = data.val();
       console.log(data.val());
       if(birthdayMessage !=null){

        this.birthdayMessageArray = [] 

        var keys: any = Object.keys(birthdayMessage);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:birthdayMessage[k].message ,
           occasion:birthdayMessage[k].occasion 
         }
    
       this.birthdayMessageArray.push(obj)
 
        resolve(this.birthdayMessageArray);
 
         
   }
       }else{
        
       }
 
      
 })

 })
}


getWeddingMessage(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/Wedding").on('value', (data: any) => {

      var weddingMessages = data.val();
       console.log(data.val());
       if(weddingMessages !=null){

        this.weddingMessageArray = [] 

        var keys: any = Object.keys(weddingMessages);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:weddingMessages[k].message ,
           occasion:weddingMessages[k].occasion 
         }
    
       this. weddingMessageArray.push(obj)
 
        resolve(this.weddingMessageArray);
 
         
   }
       }else{
        
       }
 
      
 })

 })
}


getbabyShower(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/Baby shower").on('value', (data: any) => {

      var babyShower = data.val();
       console.log(data.val());
       if(babyShower !=null){

        this.birthdayMessageArray = [] 

        var keys: any = Object.keys(babyShower);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:babyShower[k].message ,
           occasion:babyShower[k].occasion 
         }
    
       this. babyShowerMessageArray.push(obj)
 
        resolve(this.babyShowerMessageArray);
 
         
   }
       }else{
        
       }
 
      
 })

 })
}

getThinkingofyou(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/Thinking of you").on('value', (data: any) => {

      var thinkingofyou = data.val();
       console.log(data.val());
       if(thinkingofyou !=null){

        this.thinkingofyou = [] 

        var keys: any = Object.keys(thinkingofyou);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:thinkingofyou[k].message ,
           occasion:thinkingofyou[k].occasion
         }
    
       this.thinkingofyou.push(obj)
 
        resolve(this.thinkingofyou);
 
         
   }
       }else{
        
       }
 
      
 })

 })
  
}

getAnniversaryMessages(){

  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/Anniversary").on('value', (data: any) => {

      var Anniversary = data.val();
       console.log(data.val());
       if(Anniversary !=null){

        this.anniversary = [] 

        var keys: any = Object.keys(Anniversary);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:Anniversary[k].message ,
           occasion:Anniversary[k].occasion
         }
    
       this.anniversary.push(obj)
 
        resolve(this.anniversary);
 
         
   }
       }else{
        
       }
 
      
 })

 })

}

getGraduationMessages(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/Graduation").on('value', (data: any) => {

      var Graduation = data.val();
       console.log(data.val());
       if(Graduation !=null){

        this.birthdayMessageArray = [] 

        var keys: any = Object.keys(Graduation);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:Graduation[k].message ,
           occasion:Graduation[k].occasion
         }
    
       this.graduation.push(obj)
 
        resolve(this.graduation);
 
         
   }
       }else{
        
       }
 
      
 })

 })

}

getJobMessage(){

  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/New-JOb").on('value', (data: any) => {

      var newJob = data.val();
       console.log(data.val());
       if(newJob !=null){

        this.birthdayMessageArray = [] 

        var keys: any = Object.keys(newJob);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:newJob[k].message ,
           occasion:newJob[k].occasion
         }
    
       this.newJob.push(obj)
 
        resolve(this.newJob);
 
         
   }
       }else{
        
       }
 
      
 })

 })

}

getGeneralMessage(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref("category/General").on('value', (data: any) => {

      var General = data.val();
       console.log(data.val());
       if(General !=null){

        this.birthdayMessageArray = [] 

        var keys: any = Object.keys(General);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k,
           message:General[k].message ,
           occasion:General[k].occasion
         }
    
       this.general.push(obj)
 
        resolve(this.general);
 
         
   }
       }else{
        
       }
 
      
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

  
}
