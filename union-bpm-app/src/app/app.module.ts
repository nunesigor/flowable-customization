import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { FlowableService } from './flowable.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { ProcessComponent } from './bpm/process/process.component';
import { ProcessInstancesComponent } from './bpm/process/instances/processinstances.component';
import { AlertService } from './alert/alert.service';
import { AlertComponent } from './alert/alert.component';
import { TaskComponent } from './bpm/task/task.component';
import { FieldControlService } from './dinamicform/fieldcontrol.service';
import { DynamicFormComponent } from './dinamicform/dynamicform.component';
import { DynamicFormFieldComponent } from "./dinamicform/DynamicFormFieldComponent";
import { FieldService } from './dinamicform/field.service';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let headers = req.headers;
    headers = headers.append("X-Requested-With", "XMLHttpRequest");
    headers = headers.append('Content-Type', 'application/json');
    //console.log(headers);
    const authReq = req.clone({ headers: headers, responseType:"json", withCredentials:true});
    return next.handle(authReq);
  }
  
}

@NgModule({
  declarations: [
    //components here
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChangePasswordComponent,
    ProcessComponent,
    ProcessInstancesComponent,
    AlertComponent,
    TaskComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    //services and guards here
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true  },
    CookieService,
    AuthService,
    FlowableService,
    AlertService,
    FieldControlService,
    FieldService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
