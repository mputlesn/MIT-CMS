import { Component, OnInit } from '@angular/core';
import { MitService } from '../../provider/mit.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  

  constructor(private mit: MitService, private router: Router) { }

  ngOnInit() {
    
    this.getallUsers()
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

  getallUsers(){
    this.mit.getUser().then((data:any)=>{
      this.users = data
    })
  }

}
