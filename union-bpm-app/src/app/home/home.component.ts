import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlowableService, Body, Method } from '../flowable.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {};

  constructor(private auth:AuthService,
    private flowable:FlowableService,
    private router:Router) { }

  ngOnInit() {
    let data:Body = new Body();
    data.method = Method.GET
    data.uri = 'idm-api/users';
    this.flowable.invoke(data).subscribe(res=>{
      console.log(res);
      this.user = res;
    },
    (error)=>{
      console.log(error);
      this.router.navigate(['login']);
    });
  }

}
