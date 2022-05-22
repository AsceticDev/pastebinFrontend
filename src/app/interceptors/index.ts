import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthErrorhandlingInterceptor } from "./auth/auth-errorhandling-interceptor";
import { AuthHeaderInterceptor } from "./auth/auth-header-interceptor";

export const httpInterceptProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorhandlingInterceptor, multi: true}
]