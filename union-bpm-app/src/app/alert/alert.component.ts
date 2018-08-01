import { Component, OnInit } from '@angular/core';
import { Message, AlertService, MessageType } from './alert.service';
import { interval } from 'rxjs';

@Component({
    selector: 'alert',
    template: `
    <div>
        <p class="alert" [ngClass]="classStyle" *ngIf="message.message && message.message != ''" 
            (click)="close()" style="cursor: pointer;">
        {{message.message}}</p>
    </div>
  `,
})
export class AlertComponent implements OnInit{

    message: Message;
    classStyle:string = '';
    closeMessage = interval(10000);

    constructor(private alertSevice:AlertService) { }

    ngOnInit(){
        this.alertSevice.messageSubject.subscribe(res=>{
            this.message = res;
            switch (this.message.type) {
                case MessageType.SUCCESS:{
                    this.classStyle = 'alert-success';
                    break;
                }
                case MessageType.INFO:{
                    this.classStyle = 'alert-info';
                    break;
                }
                case MessageType.WARNING:{
                    this.classStyle = 'alert-warning';
                    break;
                }
                case MessageType.DANGER:{
                    this.classStyle = 'alert-danger';
                    break;
                }
                default:{
                    this.classStyle = 'alert-info';
                    break;
                }   
            }
        });
        this.closeMessage.subscribe(aux=>{
            let m = new Message();
            m.message = '';
            this.alertSevice.messageSubject.next(m);
        });
    }

    close(){
        this.message.message = "";
    }

}
