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

    public login(credentials, callback){
        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});
        //return this.http.get(environment.rest_app + 'idm-api/users', {headers:headers});
        return this.http.get(environment.rest_client_app + 'login', {headers:headers});
    }

    public registerCookie(){
        // let headers = new HttpHeaders()
        //     .set('X-Requested-With','XMLHttpRequest');
        // return this.http.get(environment.idm_app + 'app/rest/authenticate', {headers:headers,withCredentials:true});
    }

    public getUserData(){
        return this.http.get(environment.rest_app + 'idm-api/users');
    }


}