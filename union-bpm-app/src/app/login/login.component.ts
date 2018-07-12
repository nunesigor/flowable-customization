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


  constructor(private auth:AuthService,
    private router:Router,
    private formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        'user' : ['',Validators.required],
        'password' : ['',Validators.required],
        'remember' : 'false'
      });
      this.user = this.form.controls['user'];
      this.password = this.form.controls['password'];
      this.remember = this.form.controls['remember'];
    }

  ngOnInit() {
    
  }

  submit(){
    console.log('>>> submit ' + this.user.value + ' ' + this.remember.value);
    this.auth.login(this.user.value, this.password.value, this.remember.value).subscribe(resp=>{
      if (resp){
        console.log(resp);
        this.router.navigate(['home']);
      }
    },
    (error)=>{
      console.log(error);
    });
  }

}
