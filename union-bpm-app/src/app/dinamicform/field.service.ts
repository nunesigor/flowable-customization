import { Injectable } from "@angular/core";
import { FieldBase } from "./fieldbase";
import { DropdownField } from "./dropdownfield";
import { TextboxField } from "./textboxfield";

@Injectable()
export class FieldService {

    getFields(fieldsIn: Array<any>) {
        let count = 0
        let fieldsOut: FieldBase<any>[] = [];
        fieldsIn.forEach(el => {
            switch (el['type']) {
                case "text": {
                    fieldsOut.push(new TextboxField({
                        key: el['id'],
                        label: el['name'],
                        value: el['value'],
                        required: el['required'],
                        type: el['type'],
                        order: count++
                    }));
                    break;
                }
                case "date": {
                    fieldsOut.push(new TextboxField({
                        key: el['id'],
                        label: el['name'],
                        value: el['value']!==''?el['value']:Date.now(),
                        required: el['required'],
                        type: el['type'],
                        order: count++
                    }));
                    break;
                }
                case "email": {
                    fieldsOut.push(new TextboxField({
                        key: el['id'],
                        label: el['name'],
                        value: el['value'],
                        required: el['required'],
                        type: el['type'],
                        order: count++
                    }));
                    break;
                }
                case "number": {
                    fieldsOut.push(new TextboxField({
                        key: el['id'],
                        label: el['name'],
                        value: el['value'],
                        required: el['required'],
                        type: el['type'],
                        order: count++
                    }));
                    break;
                }
                case "password": {
                    fieldsOut.push(new TextboxField({
                        key: el['id'],
                        label: el['name'],
                        value: el['value'],
                        required: el['required'],
                        type: el['type'],
                        order: count++
                    }));
                    break;
                }
                // case "text":{
                //     fieldsOut.push(new DropdownField({
                //     key: 'brave',
                //     label: 'Bravery Rating',
                //     options: [
                //         { key: 'solid', value: 'Solid' },
                //         { key: 'great', value: 'Great' },
                //         { key: 'good', value: 'Good' },
                //         { key: 'unproven', value: 'Unproven' }
                //     ],
                //     order: 3
                // }));
                //     break;
                // }

            }
        });

        return fieldsOut;
    }
}