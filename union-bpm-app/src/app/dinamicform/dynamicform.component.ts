import { Component, OnInit, Input } from "@angular/core";
import { FieldBase } from "./fieldbase";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamicform.html',
  })
  export class DynamicFormComponent implements OnInit {
   
    @Input() fields: FieldBase<any>[] = [];
    form: FormGroup;
    payLoad = '';
   
    constructor(private fb:FormBuilder) {  }
   
    ngOnInit() {
      this.form = this.toFormGroup(this.fields);
    }
   
    onSubmit() {
      this.payLoad = JSON.stringify(this.form.value);
    }

    toFormGroup(fields: FieldBase<any>[] ) {
      const group = this.fb.group({});
      this.fields.forEach(control => {
        if (control.required){
          group.addControl(control.key, this.fb.control(control.value || '',Validators.required));
        } else {
          group.addControl(control.key, this.fb.control(control.value || ''));
        }
      });
      return group;
    }
  }