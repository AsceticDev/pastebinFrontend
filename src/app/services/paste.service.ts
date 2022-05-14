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
  public pasteDetailsStorage = {};
  public pasteList: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService
  ) { }

  createPaste(pasteForm) {

    return this.http.post<any>(this.baseUrl+'/api/v1/pastes', pasteForm)
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('creating paste');
        }
      )
    )
  }

  getPaste(pasteId) {

    return this.http.get<any>(this.baseUrl+'/api/v1/pastes/'+pasteId)
    .pipe(
      tap(
        res => {
          this.pasteDetailsStorage = res.paste;
          console.log('getting paste');
        }
      )
    )
  }

  getAllPastes(paginationUrl) {

    return this.http.get<any>(this.baseUrl+paginationUrl)
    .pipe(
      tap(
        res => {
          console.log(res);
          this.pasteList = res;
          console.log('getting all pastes');
        }
      ),
    );
  }

  updatePaste(id: any, pasteData) {

    return this.http.put<any>(this.baseUrl+`/${id}`, pasteData)
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('updating paste');
        }
      ),
    );
  }

  deletePaste(id: any) {

    return this.http.delete<any>(this.baseUrl+`/${id}`)
    .pipe(
      tap(
        res => {
          console.log(res);
          console.log('deleting paste');
        }
      ),
    );
  }

}
