import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, filter, map, retry, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthErrorhandlingInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public authService: AuthService,
        public toastController: ToastController,
        public router : Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('the req: ', req);

        return next.handle(req)
        .pipe(
            //retry on failure
            retry(2),

            // Handle errors
            catchError((error: HttpErrorResponse) => {
                if(error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
                    console.log('not login and 401 status error');
                    return this.handle401Error(req, next);
                }else if(error instanceof HttpErrorResponse && error.status === 422) {
                    this.handle422Error(req, next);
                }
                //add error handling logic here
                console.log('request url:', req.url)
                this.presentToast(error);
                return throwError(error);
            })
        );


    }

    //functions

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        console.log('handle401error fired off');
        if(!this.isRefreshing) {
            console.log('not refreshing, setting to refreshing');
            this.isRefreshing = true;
            //set refreshtokensubject behavior subject to null since there's nothing and dont want to loop forever
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    console.log('switchmap refreshToken() func from pipe \n return token here: ', token);
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt)
                    return next.handle(this.addTokenHeader(request, token.jwt));
                }));
        } else {
            console.log('in else statement of if is refreshing');
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    console.log('we in the switchMap of else statement')
                    return next.handle(this.addTokenHeader(request, jwt));
                })
            )
        }
    }

    private handle422Error(request: HttpRequest<any>, next: HttpHandler) {
        console.log('422 error, prob empty token or expired');
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }



    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`
        }
        });
    }


    async presentToast(error) {
        if(error.error.msg) {
            error = error.error.msg;
        }else {
            error = error.message;
        }
        const toast = await this.toastController.create({
            message: error,
            icon: 'close-circle-outline',
            color: 'dark',
            position: 'bottom',
            duration: 6000
        });
        toast.present();
    }

}