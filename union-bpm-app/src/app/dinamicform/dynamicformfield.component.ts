import { Component, Input } from "@angular/core";
import { FieldBase } from "./fieldbase";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'field',
    templateUrl: './dynamicformfield.html'
  })
  export class DynamicFormFieldComponent {
    @Input() field: FieldBase<any>;
    @Input() form: FormGroup;
    // get isValid() { return this.form.controls[this.field.key].valid; }
  }