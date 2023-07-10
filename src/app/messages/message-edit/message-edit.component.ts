import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  //properties of Message
  subject: string = '';
  messageText: string = '';
  currentSender: string = 'Isaac Newton';
  messageId: number = 20;

  constructor(private messageService: MessagesService) {}

  onSendMessage() {
    let newMessage: Message = new Message(
      this.messageId,
      this.subject,
      this.messageText,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);

    this.onClear();
  }
  onClear() {
    this.subject = '';
    this.messageText = '';
  }
}
