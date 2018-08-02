import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FieldService } from 'src/app/dinamicform/field.service';
import { Body, Method, FlowableService } from 'src/app/flowable.service';
import { Message, MessageType, AlertService } from 'src/app/alert/alert.service';


@Component({
  selector: 'taskdetail',
  templateUrl: './taskdetail.html',
  styleUrls: ['./taskdetail.css']
})
export class TaskDetailComponent implements OnInit {

  fields: any[] = [];
  taskId = null;
  task = null;
  formDefinition = null;

  constructor(private fieldService: FieldService,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private flowable: FlowableService) {
    this.activatedRoute.params.subscribe(param => {
      if (param['taskId']) {
        this.taskId = decodeURIComponent(param['taskId']);
        console.log(this.taskId);
        this.loadTask();
      }
    });
  }

  ngOnInit() {
  }

  loadTask(){
    let data: Body = new Body();
    data.method = Method.GET
    data.uri = 'service/runtime/tasks/' + this.taskId;
    this.flowable.invoke(data).subscribe(res => {
      console.log(res);
      this.task = res;
      this.loadFormDefinition();
    },
      (error) => {
        this.alert.next(new Message(error.message, MessageType.DANGER));
      });
  }

  loadFormDefinition(){
    let data: Body = new Body();
    data.method = Method.GET
    data.uri = 'form-api/form-repository/form-definitions?key=' + this.task.formKey + '&latest=true';
    this.flowable.invoke(data).subscribe(res => {
      console.log(res);
      this.formDefinition = res['data'][0];
      this.loadFormFields();
    },
      (error) => {
        this.alert.next(new Message(error.message, MessageType.DANGER));
      });
  }

  loadFormFields(){
    let data: Body = new Body();
    data.method = Method.GET
    data.uri = 'form-api/form-repository/form-definitions/' + this.formDefinition.id + '/model';
    this.flowable.invoke(data).subscribe(res => {
      console.log(res);
      this.fields = this.fieldService.getFields(res['fields']);
    },
      (error) => {
        this.alert.next(new Message(error.message, MessageType.DANGER));
      });
  }

}
