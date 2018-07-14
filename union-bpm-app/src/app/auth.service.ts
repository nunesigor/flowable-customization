import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { Headers, RequestOptionsArgs } from "@angular/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthService{

    public loggedUser:BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http:HttpClient,
        private router:Router,
        private cookieService: CookieService){

    }

    public login(user:string, password:string, rememberMe:boolean){
        // let headers = new HttpHeaders()
        //     .set('X-Requested-With','XMLHttpRequest')
        //     .set('Content-type','application/x-www-form-urlencoded; charset=UTF-8')
        // let body = new HttpParams()
        //     .set('j_username',user)
        //     .set('j_password',password)
        //     .set('_spring_security_remember_me',''+rememberMe)
        //     .set('submit','Login');
        // return this.http.post(environment.idm_app + 'app/authentication',body, {headers:headers,withCredentials:true});
        let headers = new HttpHeaders()
            .set('username',user)
            .set('password',password);
        return this.http.get('http://rest-admin:test@localhost:8080/flowable-rest/');
    }

    public registerCookie(){
        let headers = new HttpHeaders()
            .set('X-Requested-With','XMLHttpRequest');
        return this.http.get(environment.idm_app + 'app/rest/authenticate', {headers:headers,withCredentials:true});
    }

    public getUserData(){
        return this.http.get('http://rest-admin:test@localhost:8080/flowable-rest/service/identity/users');

        //return this.http.get(environment.rest_app + 'service/identity/users');
    }


}