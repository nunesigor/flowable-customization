import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.auth.getUserData().subscribe(res=>{
      if (res){
        console.log(res);
        this.auth.loggedUser.next(res);
      }
    },
    (error)=>{
      console.log(error);
      this.router.navigate(['login']);
    });
  }

}
