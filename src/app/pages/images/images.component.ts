import { Component, OnInit } from '@angular/core';
import { MitService } from '../../provider/mit.service';


declare var firebase;

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  url ='http://www.dealnetcapital.com/files/2014/10/blank-profile.png';

  cards = []

  constructor(private mit: MitService) { }

  ngOnInit() {
    this.getAllCards()
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
      this.mit.sucess("Card Uploaded Successfully")
    }).catch((error)=>{
      this.mit.oops("Oops something went wrong please try again")
    })
  }

  delete(key){
    this.mit.deleteCard(key)
  }

}
