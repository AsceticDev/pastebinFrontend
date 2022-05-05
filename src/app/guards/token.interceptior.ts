import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(request)
    if (request.url.includes('refresh')){
      console.log("Checking Request Here: ", request);
      request = this.addToken(request, this.authService.getRefreshToken());
    } else{
      if (this.authService.getJwtToken()) {
        request = this.addToken(request, this.authService.getJwtToken());
      }
    }


    return next.handle(request).pipe(catchError(error => {
      console.log(request.url)
      if (request.url.includes('refresh')){
        console.log('we trying to refresh')
        request = this.addToken(request, this.authService.getRefreshToken()) 
      } else if (error instanceof HttpErrorResponse && (error.status === 401 || error.status == 422)) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }


 handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          console.log('before refreshtokensubject inserted token')
          this.refreshTokenSubject.next(token.access_token);
          console.log('after refreshtokensubject inserted token')
          return next.handle(this.addToken(request, token.access_token));
        }));

    } else {
        console.log('we\'re refreshing bitches!')
        return this.refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(access_token => {
            console.log(access_token)
            console.log('we\'re in switchmap NOT refreshing!!')
            return next.handle(this.addToken(request, access_token));
        }));
    }
  }
}