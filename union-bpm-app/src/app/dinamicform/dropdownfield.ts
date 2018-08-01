import { FieldBase } from "./fieldbase";

export class DropdownField extends FieldBase<string> {
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];
  
    constructor(options: {} = {}) {
      super(options);
      this.options = options['options'] || [];
    }
  }