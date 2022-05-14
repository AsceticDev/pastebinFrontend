import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
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
    public router: Router
  ) { }

  ngOnInit() {
    this.getUserList();
  }


  getUserList(){
    this.userService.getAllUsers(this.pageUrlEndpoint).subscribe();
  }

  goToUser(userid) {
    this.router.navigate(['/user/' + userid]);
  }

}
