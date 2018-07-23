import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { Headers, RequestOptionsArgs } from "@angular/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthService{

    authenticated = false;

    public loggedUser:BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http:HttpClient,
        private router:Router,
        private cookieService: CookieService){
    }

    public login(credentials){
        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});
        //return this.http.get(environment.rest_app + 'idm-api/users', {headers:headers});
        return this.http.get(environment.rest_client_app + 'token', {headers:headers});
    }

    public logout(){
        return this.http.get(environment.rest_client_app + 'logout');
    }

    public getUserData(){
        return this.http.get(environment.rest_client_app + 'loggeduser');
    }

    public changePassword(data){
        return this.http.post(environment.rest_client_app + 'changepassword',data);
    }


}