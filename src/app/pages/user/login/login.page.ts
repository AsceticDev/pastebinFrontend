import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;


  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
      this.ionicForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]],
    });
  }


 login(){
    this.isSubmitted = true;
    if(!this.ionicForm.valid){
      console.log('Please provide all required fields.');
      return false;
    } else {
      this.authService.login(this.ionicForm.value).subscribe(
        (success: any) => {
          if(success === false){
            console.log('login failed.')
          }else{
            console.log('Login was successful.', success);
          }
        }, (error: any) => {
          console.log('Login failed.', error);
        }
      );
    }
  }

  async presentLoginFailedAlert(){
    const alert = await this.alertController.create({
      header: 'Login failed',
      message: 'Username or password does not match.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        },
      ]
    });
    alert.present();
  }
}
