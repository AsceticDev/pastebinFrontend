import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = 'http://localhost:5000';
  public userDetailsStorage = [];
  public userList: any = [];

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public authService: AuthService
  ) { }



  public createUser(userForm) {

    return this.http.post<any>(this.baseUrl + '/api/v1/users', userForm)
      .pipe(
        tap(
          res => {
            console.log(res);
            console.log('creating user');
          }
        )
      )
  }


  public getUser(userId){

    return this.http.get<any>(this.baseUrl + '/api/v1/users/' + userId)
    .pipe(
      tap(
        res => {
          this.userDetailsStorage = res.user;
        }
      )
    )
  }

  public getAllUsers(paginationUrl) {

    return this.http.get<any>(this.baseUrl + paginationUrl)
    .pipe(
      tap(
        res => {
          this.userList = res;
        }
      )
    );
  }

  public updateUser(id: any, postData) {

    return this.http.put(this.baseUrl + `/${id}`, postData)
    .pipe(
      tap(
        res=> {
          console.log(res);
          console.log('updating user');
        }
      )
    );
  }

  public deleteUser(id: any) {

    return this.http.delete(this.baseUrl + `/${id}`)
    .pipe(
      tap(
        res=> {
          console.log(res);
          console.log('deleting user');
        }
      )
    )
  };


}
