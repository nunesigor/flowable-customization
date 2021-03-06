import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlowableService, Body, Method } from '../flowable.service';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {};

  constructor(private auth: AuthService,
    private flowable: FlowableService,
    private router: Router,
    private cookie:CookieService) { }

  ngOnInit() {
    this.auth.getUserData().subscribe(res => {
      this.auth.loggedUser.next(res);
      this.user = res;
    },
      (error) => {
        this.router.navigate(['login']);
      });
  }

  logout(){
    this.auth.logout().subscribe(res=>{
      //this.cookie.deleteAll('/');
      this.router.navigate(['login']);
    });
  }

}
