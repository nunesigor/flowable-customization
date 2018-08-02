import { Component, OnInit, Input } from "@angular/core";
import { FieldBase } from "./fieldbase";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamicform.html',
  })
  export class DynamicFormComponent implements OnInit {
   
    @Input() fields: FieldBase<any>[] = [];
    form: FormGroup;
    payLoad = '';
   
    constructor() {  }
   
    ngOnInit() {
      this.form = this.toFormGroup(this.fields);
    }
   
    onSubmit() {
      this.payLoad = JSON.stringify(this.form.value);
    }

    toFormGroup(fields: FieldBase<any>[] ) {
      let group: any = {};
  
      fields.forEach(field => {
        group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                          : new FormControl(field.value || '');
      });
      return new FormGroup(group);
    }
  }