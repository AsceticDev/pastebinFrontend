import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { ToastController } from '@ionic/angular';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, filter, map, retry, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    constructor(
        public authService: AuthService,
        public toastController: ToastController
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //Add Auth Token
        let auth_token = this.authService.getJwtToken();
        if(!auth_token){
            console.log('empty token');
        }
        let reqWithAuth = null;
        if (req.url.includes('auth/refresh')){
            auth_token = this.authService.getRefreshToken();
            reqWithAuth = this.addTokenHeader(req, auth_token);
        } else {
            reqWithAuth = this.addTokenHeader(req, auth_token);
        }

        return next.handle(reqWithAuth)

    }
    //functions

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`
        }
        });
    }


}

