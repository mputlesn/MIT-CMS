import { Component, OnInit } from '@angular/core';
import { MitService } from '../../provider/mit.service';
import { Router } from '@angular/router';

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
