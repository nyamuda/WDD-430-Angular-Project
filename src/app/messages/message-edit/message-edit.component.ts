import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();

  //properties of Message
  subject: string = '';
  messageText: string = '';
  currentSender: string = 'Tatenda Nyamuda';
  messageId: number = Math.floor(Math.random() * 100);

  onSendMessage() {
    let newMessage: Message = new Message(
      this.messageId,
      this.subject,
      this.messageText,
      this.currentSender
    );

    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }
  onClear() {
    this.subject = '';
    this.messageText = '';
  }
}
