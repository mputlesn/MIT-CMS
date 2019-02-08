import { Component, OnInit } from '@angular/core';
import { MitService } from '../../provider/mit.service'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  track = 1
  loginEmail ;
  loginPassword ;

  constructor(private mitDB: MitService, private router: Router) { }

  ngOnInit() {
    this.Login()
  }

  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  register() {
    document.getElementById('register').style.display = 'block'
    document.getElementById('Login').style.display = 'none'



  }
  Login() {
    document.getElementById('Login').style.display = 'block'
    document.getElementById('register').style.display = 'none'

  }

  userReg(username, email, password) {
    this.mitDB.register(email, password, username).then(() => {
    this.mitDB.sucess("Please check your email and Verify")
     
    }).catch((error)=>{
      this.mitDB.oops(error.message)
    })
  }

  userLogin(email, password) {

    console.log(this.loginEmail);
    console.log(this.loginPassword);
    
    
    if(this.loginEmail ==undefined && this.loginPassword ==undefined){
      this.mitDB.oops("Please Enter all details")

   }else {
     
    this.mitDB.loginx(this.loginEmail,this.loginPassword).then((user)=>{
      console.log(user);
      
     
     if(user.user.emailVerified ==true){
       this.router.navigate(['/home']);

     }
    }).catch((error)=>{
       this.mitDB.oops(error.message) ;
    })
     
   }
    
    
   }

}
