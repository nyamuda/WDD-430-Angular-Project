import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { addNewMessage, fetchedMessage, randomMessages } from './utils/utils';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _messages: Array<Message> = new Array<Message>();
  @Output() addMessageEvent = new EventEmitter<Array<Message>>();

  constructor(private contactsService: ContactsService) {}

  getMessages(): Array<Message> {
    //clear the messages
    this._messages = [];
    randomMessages().forEach((data) => {
      //each message has a property 'sender':string
      //the value is and an id of the contact who send the message
      //we want the actual name of the sender, not the id
      //so first we get the sender
      let sender: Contact = this.contactsService.getContact(
        Number(data.sender)
      );

      //create a message
      let message = new Message(
        Number(data.id),
        data.subject,
        data.msgText,
        sender.getName() //we put the name of the sender, not their id
      );
      this._messages.push(message);
    });
    return this._messages;
  }

  setMessages(messages: Array<Message>) {
    messages.forEach((message) => {
      //add message to the original list
      let messageToAdd: fetchedMessage = {
        id: message.getId(),
        subject: message.getSubject(),
        msgText: message.getMessageText(),
        sender: message.getSender(),
      };
      addNewMessage(messageToAdd);

      //update the current list of messages
      this._messages.push(message);
    });

    // //fire an event
    this.addMessageEvent.emit(this.getMessages());
  }

  getMessage(id: number): Message {
    let message = this.getMessages().filter((message: Message) => {
      return message.getId() == id;
    })[0];
    return message;
  }
}
