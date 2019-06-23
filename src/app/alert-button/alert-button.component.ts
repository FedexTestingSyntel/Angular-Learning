import { Component, OnInit } from '@angular/core';
// import { MessageService } from '../message.service';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})

export class AlertButtonComponent implements OnInit {

  //  Properties
  content: Observable<any>;
  hideContent = true;
  severity = 423;

  constructor(private msgService: MessageService) { }

  ngOnInit() {
    this.content = this.msgService.getContent();
  }

  toggle() {
    this.hideContent = !this.hideContent;
  }

  // every 500ms call the toggle() function
  toggleAsync() {
    timer(500).subscribe(() => {
      this.toggle();
      });
  }

}
