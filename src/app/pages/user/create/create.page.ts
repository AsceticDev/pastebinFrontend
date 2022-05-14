import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;


  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    username : ['', [Validators.required, Validators.minLength(4)]],
    password : ['', [Validators.required, Validators.minLength(4)]],
    }) 
  }


  get errorControl() {
    return this.ionicForm.controls;
  }

  createUser(){
    this.isSubmitted = true;
    if(!this.ionicForm.valid){
      console.log('Please provide all required fields');
      return false;
    } else {
      console.log('form here: ', this.ionicForm);
      this.userService.createUser(this.ionicForm.value).subscribe(
        (success: any) => {
            console.log('user creation was successful', success)
            this.router.navigateByUrl('/user/' + success.user.id);
          }
      );
    }
  }
}
