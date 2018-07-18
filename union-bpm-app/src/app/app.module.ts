import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserXhr, BaseRequestOptions, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { FlowableService } from './flowable.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let headers = new HttpHeaders();
    headers = req.headers;
    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set('Content-Type', 'application/json');
    const authReq = req.clone({ headers: headers, responseType:"json", withCredentials:true});
    console.log(authReq);
    return next.handle(authReq);
  }
  
}

// @Injectable()
// export class CustomRequestOptions extends BaseRequestOptions {
//   constructor() {
//     super();
//     this.headers.append('X-Requested-With', 'XMLHttpRequest');
//     this.headers.append('Content-Type', 'application/json');
//   }
// }

@NgModule({
  declarations: [
    //components here
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    //services and guards here
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: BaseRequestOptions, useClass: CustomRequestOptions },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true  },
    CookieService,
    AuthService,
    FlowableService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
