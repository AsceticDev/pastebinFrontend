import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public userId: any;
  public isSubmitted = false;
  public ionicForm: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public router: Router,
    public formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.getUserData(this.userId);
    this.ionicForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  getUserData(userid) {
    this.userService.getUser(userid).subscribe(
      (success: any) => {
          console.log('getting user data success', success);
      }
    )
  }

  editUser(userId){
    this.isSubmitted = true;
    if(!this.ionicForm.valid){
      console.log('Please provide all required fields');
      return false;
    } else {
      console.log('form here: ', this.ionicForm);
      this.userService.updateUser(userId, this.ionicForm.value).subscribe(
        (success: any) => {
            console.log('user edit was successful', success);
        }
      )
    }
  }

  goToPastes(){
    this.router.navigate(['/user/details/paste-list/' + this.userId]);

  }

}
