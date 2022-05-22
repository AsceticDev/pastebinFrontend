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
        const auth_token = this.authService.getJwtToken();
        if(!auth_token){
            console.log('empty token');
        }
        const reqWithAuth = this.addTokenHeader(req, auth_token);

        if (req.url.includes('auth/refresh')){
            const refresh_token = this.authService.getRefreshToken();
            const reqRefresh = this.addTokenHeader(req, refresh_token);
            return next.handle(reqRefresh);
        }else {

            return next.handle(reqWithAuth);
        }


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

