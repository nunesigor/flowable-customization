import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: AbstractControl;
  password: AbstractControl;
  remember: AbstractControl;


  constructor(private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      'user': ['', Validators.required],
      'password': ['', Validators.required],
      'remember': 'false'
    });
    this.user = this.form.controls['user'];
    this.password = this.form.controls['password'];
    this.remember = this.form.controls['remember'];
  }

  ngOnInit() {

  }

  submit() {
    let credentials = {};
    credentials['username'] = this.user.value;
    credentials['password'] = this.password.value;
    this.auth.login(credentials, ()=>{
      console.log('callback.....');
      console.log(this);
    }).subscribe(resp => {
      console.log('resp.....');
      console.log(resp);
    },
      (error) => {
        console.log('error.....');
        console.log(error);
      });
  }

}
