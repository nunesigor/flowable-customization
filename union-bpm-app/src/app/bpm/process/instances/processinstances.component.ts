import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowableService, Body, Method } from '../../../flowable.service';
import { forkJoin } from 'rxjs';
import { AlertService, Message, MessageType } from '../../../alert/alert.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'processinstances',
  templateUrl: './processinstances.html',
  styleUrls: ['./processinstances.css']
})
export class ProcessInstancesComponent implements OnInit {

  listProcessInstances: Array<any> = [];
  processDefinitionId = null;
  processDefinition = null;
  loggedUser = null;

  constructor(private flowable: FlowableService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private auth:AuthService) {
    this.activatedRoute.params.subscribe(p => {
      if (p['processId']) {
        this.processDefinitionId = decodeURIComponent(p['processId']);
      }
      this.auth.loggedUser.subscribe(user=>this.loggedUser = user);
    });
  }

  ngOnInit() {
    let data: Body = new Body();
    data.method = Method.GET
    data.uri = 'service/repository/process-definitions/' + this.processDefinitionId;
    this.flowable.invoke(data).subscribe(res => {
      this.processDefinition = res;
      this.loadInstances();
    },
    (error) => {
        this.alert.next(new Message(error.message, MessageType.DANGER));
    });


  }

  loadInstances(){
    let data2: Body = new Body();
    data2.method = Method.GET
    data2.uri = 'service/runtime/process-instances?processDefinitionId=' + this.processDefinitionId;
    this.flowable.invoke(data2).subscribe(res => {
      this.loadDetails(res['data']);
    },
    (error) => {
        this.alert.next(new Message(error.message, MessageType.DANGER));
    });
  }

  loadDetails(instances) {
    this.listProcessInstances = [];
    forkJoin(instances.map(element => {
      let data: Body = new Body();
      data.method = Method.GET
      data.uri = 'service/runtime/tasks?processInstanceId=' + element.id;
      return this.flowable.invoke(data);
    })).subscribe(res => {
      res.map(element => this.listProcessInstances.push(element['data'][0]));
      this.listProcessInstances.map(el => {
        el['task'] = el.name;
        el['name'] = this.processDefinition.name;
        el['dataIni'] = new Date(el.createTime);
        el['dataFim'] = el.dueDate ? new Date(el.dueDate) : '';
      });
    })
  }

  cancelProcessInstance(process){
    let data: Body = new Body();
    data.method = Method.DELETE
    data.uri = 'service/runtime/process-instances/' + process.processInstanceId;
    this.flowable.invoke(data).subscribe(res => {
      console.log(res);
      this.alert.next(new Message('Processo cancelado com sucesso.', MessageType.SUCCESS));
      this.loadInstances();
    },
    (error) => {
        this.alert.next(new Message(error.message, MessageType.DANGER));
    });
  }


}
