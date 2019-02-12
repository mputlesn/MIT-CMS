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

  url ='http://www.dealnetcapital.com/files/2014/10/blank-profile.png';

  cards = []

  constructor(private mit: MitService, private router: Router) { }

  ngOnInit() {
    this.getAllCards()
    
  }

  logout(){
    this.mit.signout().then(()=>{
      this.router.navigateByUrl('/');
    })
  }

  getAllCards(){
    this.mit.getAllCards().then((data:any)=>{
      // for (let i = 0; i < data.length; i++) {
      //   this.cards = data[i].card;
      //   console.log(this.cards);
        
      // }

      this.cards = data
      console.log(this.cards);
     
      
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
