import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public pageUrlEndpoint = '/api/v1/users'

  constructor(
    public userService: UserService,
    public router:Router
  ) { }

  ngOnInit() {
    this.getUserList();
  }


  getUserList(){
    this.userService.getAllUsers(this.pageUrlEndpoint).subscribe(
      (success: any) => {
        if(success === false) {
          console.log('failed getting user list.');
        } else {
          console.log('getting user list success', success);
        }
      }, (error: any) => {
        console.log('failed getting user list.', error);
      }
    )
  }

  goToUser(userid) {
    this.router.navigate(['/user/details/' + userid]);
  }

}
