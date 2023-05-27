import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  messages: Array<Message> = [];
  //display the message form or not
  displayForm: boolean = false;
  //display button that shows the form
  displayButton = true;

  constructor(private messageService: MessagesService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    //subscribe to an event
    this.messageService.addMessageEvent.subscribe((updatedMessages) => {
      this.messages = updatedMessages;
    });
  }
}
