import { ApplicationConfig, Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { Observable, tap } from 'rxjs';


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing request', req.url, req.method, req.body);
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('Incoming response', event.body);
          }
        },
        error => {
          console.error('Request error', error);
        }
      )
    );
  }
}
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
