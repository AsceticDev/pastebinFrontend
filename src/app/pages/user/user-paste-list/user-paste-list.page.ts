import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-paste-list',
  templateUrl: './user-paste-list.page.html',
  styleUrls: ['./user-paste-list.page.scss'],
})
export class UserPasteListPage implements OnInit {
  public userId: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    console.log(this.userId)
    this.getUserData(this.userId);
  }

  getUserData(userid) {
    this.userService.getUser(userid).subscribe(
      (success: any) => {
          console.log('getting user data success', success);
          console.log(this.userService.userDetailsStorage);
      }
    )
  }

  goToPasteDetail(pasteId) {
    this.router.navigate(['/paste/details/' + pasteId]);
  }

}
