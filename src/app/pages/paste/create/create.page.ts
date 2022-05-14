import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasteService } from 'src/app/services/paste.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted = false;
  public userId = null;

  constructor(
    public formBuilder: FormBuilder,
    public pasteService: PasteService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      user_id : [this.userId.id],
      content : ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  createPaste(){
    this.isSubmitted = true;
    if(!this.ionicForm.valid){
      console.log('Please provide all required fields');
      return false;
    } else {
      console.log('form here: ', this.ionicForm);
      this.pasteService.createPaste(this.ionicForm.value).subscribe(
        (success: any) => {
            console.log('user creation was successful', success);
            this.router.navigateByUrl('/paste/' + success.paste.id);
        }
      )
    }
  }


}
