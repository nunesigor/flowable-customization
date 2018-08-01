import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { FlowableService, Body, Method } from '../../flowable.service';

@Component({
  selector: 'process',
  templateUrl: './process.html',
  styleUrls: ['./process.css']
})
export class ProcessComponent implements OnInit {

  listProcess:Array<any> = [];

  
  constructor(private flowable:FlowableService,
     private router: Router) { 
      let data:Body = new Body();
      data.method = Method.GET
      data.uri = 'service/repository/process-definitions?latest=true';
      this.flowable.invoke(data).subscribe(res=>{
        this.listProcess = res['data'];
      },
      (error)=>{
        console.log(error);
      });
  }

  ngOnInit() {
  }

  createNewProcessInstance(process){

    let data:Body = new Body();
      data.method = Method.GET
      data.uri = 'service/repository/process-definitions?latest=true';
      this.flowable.invoke(data).subscribe(res=>{
        this.listProcess = res['data'];
      },
      (error)=>{
        console.log(error);
      });

  }

  listprocessInstances(process){
    console.log(process);
    let id = encodeURIComponent(process.id);
    this.router.navigate(['home','process',id]).catch(ex=>console.log(ex));
  }

}
