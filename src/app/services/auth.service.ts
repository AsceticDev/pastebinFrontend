import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastButton, ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../guards/models/tokens';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public baseUrl = 'http://localhost:5000';
  public loggedUser: any = {};
  public access_token;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';


  constructor(
    private http: HttpClient,
    private router: Router,public alertController: AlertController,
    public toastController: ToastController
  ) { }

  public login(loginDict) {

    return this.http.post<any>(this.baseUrl + '/auth/login', loginDict)
      .pipe(
        tap(
          tokens => {
            console.log('setting token');
 
            this.doLoginUser(loginDict.username, tokens),
            this.router.navigate(['/home'])
          }),
        mapTo(true),
        catchError(error => {
          this.presentToast(error);
          console.log(error);
          return of(false);
        }));
  }


  public logout() {
    return this.http.post(this.baseUrl + '/auth/logout', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        this.presentToast(error);
        return of(false);
      }));
  }

  private doLoginUser(username: string, tokens: Tokens) {
    const decoded_token: any = jwt_decode(tokens.access_token);
    console.log('Decoded Token: ', decoded_token);
    this.loggedUser.username = username;
    this.loggedUser.id = decoded_token.sub;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  public refreshToken() {
    let headers = new HttpHeaders();
    const refresh_token = this.getRefreshToken();
    headers = headers.set('Authorization', `Bearer ${refresh_token}`);

    console.log('we\'re firing off the testRefreshToken()!')
    return this.http.post(this.baseUrl + '/auth/refresh', { headers })
    .pipe(
      tap(
        (tokens: Tokens) => {
          this.storeJwtToken(tokens.access_token);
        }
      ),
      mapTo(true),
      catchError(error => {
        this.presentToast(error);
        return of(false);
      })
    );
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  public getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public getUserId() {
    let myToken = this.getJwtToken();
    const decoded_token: any = jwt_decode(myToken);
    this.loggedUser.id = decoded_token.sub;
    return this.loggedUser;
  }

  public isLoggedIn() {
    return !!this.getJwtToken();
  }

  async presentLoginFailedAlert(){
    const alert = await this.alertController.create({
      header: 'Login failed',
      message: 'Username or password does not match.',
      buttons: [
        {
          text: 'OK',
          role: 'Ok'
        },
      ]
    });
    alert.present();
  }


  async presentToast(error) {
    if (error.error.msg){
      const toast = await this.toastController.create({
        message: error.error.msg,
        icon: 'close-circle-outline',
        color: 'dark',
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    } else {
        const toast = await this.toastController.create({
        message: error.error.message,
        icon: 'close-circle-outline',
        color: 'dark',
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }
  }
}
