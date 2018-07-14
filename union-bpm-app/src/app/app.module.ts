import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserXhr, BaseRequestOptions, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor() {
    super();
  }

  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}

export class CustomRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    if (!this.headers.has('XMLHttpRequest')) {
      this.headers.append('X-Requested-With', 'XMLHttpRequest');
    }
    if (!this.headers.has('application/json')) {
      this.headers.append('Content-type', 'application/json');
    }
  }
}

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
    { provide: BaseRequestOptions, useClass: CustomRequestOptions },
    { provide: BrowserXhr, useClass: CustomBrowserXhr },
    CookieService,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
