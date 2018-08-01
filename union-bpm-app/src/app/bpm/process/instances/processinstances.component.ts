import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowableService, Body, Method } from 'src/app/flowable.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'processinstances',
  templateUrl: './processinstances.html',
  styleUrls: ['./processinstances.css']
})
export class ProcessInstancesComponent implements OnInit {

  listProcessInstances:Array<any> = [];
  processDefinitionId = null;
  
  constructor(private flowable:FlowableService,
     private router: Router,
     private activatedRoute:ActivatedRoute) { 
      this.activatedRoute.params.subscribe(p=>{
        if (p['processId']) {
          this.processDefinitionId = decodeURIComponent(p['processId']);
        }
      });
  }

  ngOnInit() {
    let data:Body = new Body();
      data.method = Method.GET
      data.uri = 'service/runtime/process-instances?processDefinitionId='+this.processDefinitionId;
      this.flowable.invoke(data).subscribe(res=>{
        this.loadDetails(res['data']);
      },
      (error)=>{
        console.log(error);
      });
  }

  loadDetails(instances){
    forkJoin(instances.map(element=>{
      let data:Body = new Body();
      data.method = Method.GET
      data.uri = 'service/runtime/tasks?processInstanceId='+element.id;
      return this.flowable.invoke(data);    
    })).subscribe(res=>{
      res.map(element=>this.listProcessInstances.push(element['data'][0]))
    })
  }

  

}
