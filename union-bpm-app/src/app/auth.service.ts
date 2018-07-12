import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { Headers, RequestOptionsArgs } from "@angular/http";

@Injectable()
export class AuthService{

    public loggedUser:BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http:HttpClient,
    private router:Router){

    }

    public login(user:string, password:string, rememberMe:boolean){
        // let headers = new HttpHeaders().set('X-Requested-With','XMLHttpRequest');
        // headers.append('Access-Control-Allow-Origin','*');
        let data = {};
        data['j_username'] = user;
        data['j_password'] = password;
        data['_spring_security_remember_me'] = rememberMe;
        data['submit'] = 'Login';
        return this.http.post(environment.idm_app + 'app/authentication',data);
    }

    public getUserData(){
        return this.http.get(environment.idm_app + 'app/rest/account');
    }
}