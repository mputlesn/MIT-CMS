import { Component, OnInit } from '@angular/core';
import {MitService} from '../../provider/mit.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message ;
  ocassionType ;
 
  messageArray = [] ;

  occassionType ;
  uniqueKey ;
  messageupdate ;

  constructor(public mitService:MitService) {


   }

  ngOnInit() {
    this.birthdayMessages()
   
  }

  addSave(){
    console.log(this.message);
    console.log(this.ocassionType);
    
    

    if(this.message != undefined && this.ocassionType !=undefined){
      this.mitService.saveMessage(this.message , this.ocassionType) ;
      this.mitService.sucess("Added Successfully ") ;

    }else if(this.message != undefined){
      this.mitService.oops("Please write the message")

    }else if(this.ocassionType !=undefined){
      this.mitService.oops("Please choose the occassion")

    }
    
    else {
      this.mitService.oops("Please Enter all Details")

    }
  

   }

   birthdayMessages(){
    this.mitService.getBirthdayMessages().then((data:any)=>{
      console.log(data);
      this.messageArray =data ;
      
    }) ;
     
   }

   weddingMessages(){
     this.mitService.getWeddingMessage().then((data:any)=>{
       console.log(data);
       this.messageArray = data ;
       

     })
   }

   babyShowerMessages(){
    this.mitService.getbabyShower().then((data:any)=>{
      console.log(data);
      this.messageArray = data ;
      })

   }

   ThinkingOfYou(){
    this.mitService.getThinkingofyou().then((data:any)=>{
      console.log(data);
      this.messageArray = data ;
      })

   }

   Anniversary(){
    this.mitService.getAnniversaryMessages().then((data:any)=>{
      console.log(data);
      this.messageArray = data ;
      })

   }

   NewJOb(){
    this.mitService.getJobMessage().then((data:any)=>{
      console.log(data);
      this.messageArray = data ;
      })

   }


   General(){
    this.mitService.getGeneralMessage().then((data:any)=>{
      console.log(data);
      this.messageArray = data ;
      })

   }

   delete(occassion , key ){
     console.log(key);
     console.log(occassion);

     this.mitService.delete(occassion ,key).then(()=>{
       console.log("success");
       

     }).catch((error)=>{
       console.log(error);
       
     })
     
     

   }


   update(occassion , key , message){
  
  
   
     var modal = document.getElementById('myModal');
     var btn = document.getElementById("myBtn");
     var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";




  
     this.occassionType = occassion ;
     this.uniqueKey = key ;
     this.messageupdate = message
    
    
    
     
     

   }
   updateMessage(){
     console.log(this.occassionType);
     console.log( this.uniqueKey);
     console.log(this.messageupdate);
     
     
     
     console.log(this.message);
    this.mitService.update(this.occassionType , this.uniqueKey , this.message).then(()=>{
      console.log("success");
      

    }).catch((error)=>{
      this.mitService.oops(error.message) ;
    }) ;
     
   }
}
