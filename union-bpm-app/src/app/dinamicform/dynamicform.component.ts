import { Component, OnInit, Input } from "@angular/core";
import { FieldControlService } from "./fieldcontrol.service";
import { FieldBase } from "./fieldbase";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamicform.html',
    providers: [ FieldControlService ]
  })
  export class DynamicFormComponent implements OnInit {
   
    @Input() fields: FieldBase<any>[] = [];
    form: FormGroup;
    payLoad = '';
   
    constructor(private fcs: FieldControlService) {  }
   
    ngOnInit() {
      this.form = this.fcs.toFormGroup(this.fields);
    }
   
    onSubmit() {
      this.payLoad = JSON.stringify(this.form.value);
    }
  }