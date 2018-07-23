import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Headers, RequestOptionsArgs } from "@angular/http";

export enum Method{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

export class Body{
    method: Method;
	uri: string;
	body: any;
}

@Injectable()
export class FlowableService{

    constructor(private http:HttpClient){
    }

    public invoke(body:any){
        return this.http.post(environment.rest_client_app + 'invoke',body);
    }

}