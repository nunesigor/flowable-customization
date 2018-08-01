import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { FlowableService, Body, Method } from '../../flowable.service';
import { AlertService, Message, MessageType } from '../../alert/alert.service';


@Component({
  selector: 'process',
  templateUrl: './process.html',
  styleUrls: ['./process.css']
})
export class ProcessComponent implements OnInit {

  listProcess: Array<any> = [];


  constructor(private flowable: FlowableService,
    private alert:AlertService,
    private router: Router) {
    let data: Body = new Body();
    data.method = Method.GET
    data.uri = 'service/repository/process-definitions?latest=true';
    this.flowable.invoke(data).subscribe(res => {
      this.listProcess = res['data'];
    },
      (error) => {
        this.alert.next(new Message(error.message,MessageType.DANGER));
      });
  }

  ngOnInit() {
  }

  createNewProcessInstance(process) {
    let data: Body = new Body();
    data.method = Method.POST
    data.uri = 'service/runtime/process-instances';
    data.body =  '{"processDefinitionId": "requisicao_ferias:14:37b988d1-8eb9-11e8-bfbb-5abddbe5c67a",'+
      '"returnVariables": true}';
    this.flowable.invoke(data).subscribe(res => {
      this.alert.next(new Message('processo criado com sucesso.',MessageType.SUCCESS));
      let id = encodeURIComponent(process.id);
      this.router.navigate(['home', 'process', id]).catch(ex => console.log(ex));
    },
      (error) => {
        this.alert.next(new Message(error.message,MessageType.DANGER));
      });

  }

  listprocessInstances(process) {
    let id = encodeURIComponent(process.id);
    this.router.navigate(['home', 'process', id]).catch(ex => this.alert.next(new Message(ex,MessageType.DANGER)));
  }

}
