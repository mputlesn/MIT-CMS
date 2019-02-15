import { Component, OnInit } from '@angular/core';
import { MitService } from '../../provider/mit.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  url ='../../../assets/image-holder-icon-614x460.png';

  cards = []

  constructor(private mit: MitService, private router: Router) { }

  ngOnInit() {
    this.getAllCards()
    let timerInterval
    Swal.fire({
     title: 'Loading',
     html: 'Please wait, still loading',
     timer: 2000,
     onBeforeOpen: () => {
       Swal.showLoading()
    
     },
     onClose: () => {
       clearInterval(timerInterval)
     }
    }).then((result) => {
     if (
       // Read more about handling dismissals
       result.dismiss === Swal.DismissReason.timer
     ) {
       console.log('I was closed by the timer')
     }
    })
  }

  logout(){
    this.mit.signout().then(()=>{
      this.router.navigateByUrl('/');
    })
  }

  getAllCards(){
    this.mit.getAllCards().then((data:any)=>{
      
      this.cards = data
      console.log(this.cards);
      //this.getAllCards()
     
      
    })
  }

  insertImage(event: any){
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);

    }

  }

  save(){
    this.mit.addCard(this.url).then(()=>{
      this.ngOnInit()
      this.mit.sucess("Card Uploaded Successfully")
      this.ngOnInit()
      console.log("refreshed");
      
    }).catch((error)=>{
      this.mit.oops("Oops something went wrong please try again")
    })
  }

  delete(key,index){
    console.log(index);
    

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
        this.cards.splice(index, 1)
        firebase.database().ref('category/Cards/'+key).remove()
        
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

}
