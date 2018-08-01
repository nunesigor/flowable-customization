import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { FieldService } from 'src/app/dinamicform/field.service';


@Component({
  selector: 'taskdetail',
  templateUrl: './taskdetail.html',
  styleUrls: ['./taskdetail.css']
})
export class TaskDetailComponent implements OnInit {

  fields: any[];
  taskId = null;
 
  constructor(private service: FieldService,
    private activatedRoute:ActivatedRoute) {
    this.fields = service.getFields();
    this.activatedRoute.params.subscribe(param => {
      if (param['taskId']) {
        this.taskId = decodeURIComponent(param['taskId']);
        console.log(this.taskId);
      }
      //this.auth.loggedUser.subscribe(user=>this.loggedUser = user);
    });
  }

  

   

  ngOnInit() {
  }

}
