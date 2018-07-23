import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'tarefas',
  templateUrl: './tarefas.html',
  styleUrls: ['./tarefas.css']
})
export class TarefasComponent implements OnInit {

  form: FormGroup;
  currentPassword: AbstractControl;
  newPassword: AbstractControl;
  confirmPassword: AbstractControl;
  errorNewPassword = '';
  errorConfirmPassword = '';

  
  constructor(private router: Router,
    private formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        'currentPassword': ['', Validators.required],
        'newPassword': ['', Validators.required],
        'confirmPassword': ['', Validators.required]
      });
      this.currentPassword = this.form.controls['currentPassword'];
      this.newPassword = this.form.controls['newPassword'];
      this.confirmPassword = this.form.controls['confirmPassword'];

      this.newPassword.valueChanges.pipe(debounceTime(600)).subscribe(val=>{
        if (val === this.currentPassword.value){
          this.errorNewPassword = 'Senha corrente e nova senha não podem ser iguais.';
        } else {
          this.errorNewPassword = '';
        }
        if (val !== this.confirmPassword.value){
          this.errorConfirmPassword = 'Use a mesma senha para confirmar.';
        } else {
          this.errorConfirmPassword = '';
        }
      });

      this.confirmPassword.valueChanges.pipe(debounceTime(600)).subscribe(val=>{
        if (val !== this.newPassword.value){
          this.errorConfirmPassword = 'Use a mesma senha para confirmar.';
        } else {
          this.errorConfirmPassword = '';
        }
      });
    }

  ngOnInit() {
  }

  changePassword(){
    let data = {}
    data['currentpassword'] = this.currentPassword.value;
    data['newpassword'] = this.newPassword.value;
    this.auth.changePassword(data).subscribe(res=>{
      console.log(res);
      
    });
  }

  submit(){
    this.changePassword();
  }

}
