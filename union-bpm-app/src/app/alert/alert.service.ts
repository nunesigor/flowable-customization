import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum MessageType{
    SUCCESS = "SUCCES",
    INFO = "INFO",
    WARNING = "WARNING",
    DANGER = "DANGER"
}

export class Message{
    type: MessageType = MessageType.INFO;
    message: string;
    
    constructor(message:string,type?:MessageType,){
        this.message = message;
        if (type!==null){
            this.type = type;
        }
    }

}

@Injectable()
export class AlertService {

    messageSubject:BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

    constructor(){ 
        
    }

    next(message){
        this.messageSubject.next(message);
    }

    get(){
        return this.messageSubject.getValue();
    }

}