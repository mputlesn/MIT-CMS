import { Component, OnInit } from '@angular/core';
import {MitService} from '../../provider/mit.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  seltab = 'farms'
  message ;
  messageupdates ;
  ocassionType ;
 
  messageArray = [] ;

  occassionType ;
  uniqueKey ;
  messageupdate ;
  index ;

  constructor(public mitService:MitService, private router: Router) {


   }

  ngOnInit() {
    this.birthdayMessages()
    this.seltab = 'farms'
   
  }

  logout(){
    this.mitService.signout().then(()=>{
      this.router.navigateByUrl('/');
    })
  }

  addSave(){
    console.log(this.message);
    console.log(this.ocassionType);
    
    

    if(this.message == undefined && this.ocassionType == undefined){
     this.mitService.oops("Please Enter all Details")
   
   


    }
    
    else if(this.message == undefined){
      this.mitService.oops("Please write the message")
    
    }else if(this.ocassionType ==undefined){
      this.mitService.oops("Please choose the occassion")
      
    }
    
    else {
   
   

        this.mitService.saveMessage(this.message , this.ocassionType) ;
      this.mitService.sucess("Added Successfully ") ;
     this.message = "" ;
     this.ocassionType =  ''
    this.message = undefined ;
    this.ocassionType =  undefined ;


   
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
  graduationMessages(){
    this.mitService.getGraduationMessages().then((data:any)=>{
      console.log(data);
      this.messageArray = data ;
      })

  }

   delete(occassion , key , index ){
    
    this.mitService.delete(occassion ,key)


    const swalWithBootstrapButtons = Swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
    

        this.messageArray.splice(index, 1) ;
         this.mitService.delete(occassion ,key).then(()=>{
       console.log("success");
       

     }).catch((error)=>{
       console.log(error);
       
     })
        
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
      
    })

   }


   update(occassion , key , message, index ){
  
  
   console.log(index);
   
     var modal = document.getElementById('myModal');
     var btn = document.getElementById("myBtn");
     var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";




  
     this.occassionType = occassion ;
     this.uniqueKey = key ;
     this.messageupdate = message
     this.index =index ;
    console.log(this.index);
    
    
    
     
     

   }
   updateMessage(){
     console.log(this.occassionType);
     console.log( this.uniqueKey);
     console.log(this.messageupdate);
     
     
     
     console.log(this.message);
    this.mitService.update(this.occassionType , this.uniqueKey , this.messageupdates).then(()=>{
      console.log("success");
      

    }).catch((error)=>{
      this.mitService.oops(error.message) ;
    }) ;

    var update = {
      message:this.messageupdates
    }
    this.messageArray.splice(this.index , 1 , update)
     
   }

   
}
