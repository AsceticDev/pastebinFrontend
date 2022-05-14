import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public userId: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.getUserData(this.userId);
  }

  getUserData(userid) {
    this.userService.getUser(userid).subscribe(
      (success: any) => {
          console.log('getting user data success', success);
      }
    )
  }

}
