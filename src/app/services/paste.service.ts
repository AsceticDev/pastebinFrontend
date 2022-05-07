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
export class PasteService {
  public baseUrl = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService
  ) { }

  createPaste(pasteForm) {
    let headers = new HttpHeaders();
    const auth_token = this.authService.getJwtToken();
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.post<any>(this.baseUrl+'/api/v1/pastes', pasteForm, {headers})
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('creating paste');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    )
  }

  getPaste(pasteId) {
    let headers = new HttpHeaders();
    const auth_token = this.authService.getJwtToken();
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.get<any>(this.baseUrl+'/api/v1/pastes'+pasteId, {headers})
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('getting paste');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    )
  }

  getAllPastes(paginationUrl) {
    let headers = new HttpHeaders();
    const auth_token = this.authService.getJwtToken();
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.get<any>(this.baseUrl+paginationUrl, {headers})
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('getting all pastes');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    );
  }

  updatePaste(id: any, pasteData) {
    let headers = new HttpHeaders();
    const auth_token = this.authService.getJwtToken();
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.put<any>(this.baseUrl+`/${id}`, pasteData, {headers})
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('updating paste');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    );
  }

  deletePaste(id: any) {
    let headers = new HttpHeaders();
    const auth_token = this.authService.getJwtToken();
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.delete<any>(this.baseUrl+`/${id}`, {headers})
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('deleting paste');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    );
  }



  async presentToast(error) {
    const toast = await this.toastController.create({
      message: error.error.msg,
      icon: 'close-circle-outline',
      color: 'dark',
      position: 'bottom',
      duration: 6000
    });
    toast.present();
  }

}
