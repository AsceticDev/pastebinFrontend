import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasteService } from 'src/app/services/paste.service';
import { UserService } from 'src/app/services/user.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public pasteId: any;
  public author: any;
  public isSubmitted = false;
  public isHighlightToggled: boolean = true; 
  public isEditingToggled: boolean = false;
  public ionicForm: FormGroup;
  public paste: any;
  public userList:any = [];
  public dateTime: any;
  
  public code = '';

  public pagination = '/api/v1/users'

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public pasteService: PasteService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.dateTime = new Date();
    this.pasteId = this.activatedRoute.snapshot.params.pasteId;
    this.getPasteData(this.pasteId);
    this.userService.getAllUsers(this.pagination).subscribe();
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content : ['', [Validators.required, Validators.minLength(10)]],
      encrypted: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      hasExpiration: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
    })
  }

  getPasteData(pasteId) {
    this.pasteService.getPaste(pasteId).subscribe(
      (success) => {
        this.code = success.paste.content;
        this.paste = success.paste      
        console.log('pasteeeee: ',this.paste);
      }
    );
  }

  toggleHighlight(){
    this.isHighlightToggled = !this.isHighlightToggled;
  }

  toggleEditing(){
    this.isEditingToggled = !this.isEditingToggled;
  }

  updatePaste(code){
    this.isSubmitted = true;
    if(!this.ionicForm.valid){
      console.log('Please provide all required fields');
      return false;
    } else {
      console.log('form here: ', this.ionicForm);
      this.ionicForm.get('content').setValue(code, {onlyself: true})
      this.pasteService.updatePaste(this.pasteId, this.ionicForm.value).subscribe(
        (success: any) => {
            console.log('paste edit was successful', success);
            this.isEditingToggled = !this.isEditingToggled;
        }
      )
    }
  }

  updateEncryptedBool(){
    this.paste.encrypted = !this.paste.encrypted;
  }

  updateExpirationBool(){
    this.paste.hasExpiration = !this.paste.hasExpiration
  }

  showDate(){
    console.log(this.paste.expirationDate);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  booba(){
    console.log(this.pasteService.pasteDetailsStorage);
  }

}
