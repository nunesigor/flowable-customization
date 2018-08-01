import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { FlowableService, Body, Method } from 'src/app/flowable.service';
import { AlertService, Message, MessageType } from 'src/app/alert/alert.service';

@Component({
  selector: 'task',
  templateUrl: './task.html',
  styleUrls: ['./task.css']
})
export class TaskComponent implements OnInit {

  listTasks:Array<any> = [];
  loggedUser = null;
  
  constructor(private flowable: FlowableService,
    private alert:AlertService,
    private router: Router,
    private auth:AuthService) { 
    
    this.auth.loggedUser.subscribe(user=>{
      if (user){
        this.loggedUser = user; 
        this.loadTasks();
      }      
    });
  }

  ngOnInit() {
    
  }

  loadTasks(){
    let data: Body = new Body();
    data.method = Method.GET
    data.uri = 'service/runtime/tasks?candidateOrAssigned='+this.loggedUser.id;
    this.flowable.invoke(data).subscribe(res => {
      this.listTasks = res['data'];
      this.listTasks.map(el => {
        el['dataIni'] = new Date(el.createTime);
        el['dataFim'] = el.dueDate ? new Date(el.dueDate) : '';
      });
    },
      (error) => {
        this.alert.next(new Message(error.message,MessageType.DANGER));
      });
  }

  gotoTask(task){
    let id = encodeURIComponent(task.id);
    this.router.navigate(['home', 'task', id]).catch(ex => this.alert.next(new Message(ex,MessageType.DANGER)));
  }

}
