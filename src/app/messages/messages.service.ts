import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { addNewMessage, fetchedMessage, randomMessages } from './utils/utils';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _messages: Array<Message> = new Array<Message>();
  maxMessageId: number = 0;
  @Output() addMessageEvent = new EventEmitter<Array<Message>>();

  constructor(
    private contactsService: ContactsService,
    private http: HttpClient
  ) {}

  getMessages(): Array<Message> {
    this.http
      .get<Message[]>(
        'https://wdd430-e9605-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          // messages.forEach((data: Message) => {
          //   //each message has a property 'sender':string
          //   //the value is and an id of the contact who send the message
          //   //we want the actual name of the sender, not the id
          //   //so first we get the sender
          //   let sender: Contact = this.contactsService.getContact(data.sender);

          //   console.log(sender);
          //   //create a message
          //   let message = new Message(
          //     Number(data.id),
          //     data.subject,
          //     data.msgText,
          //     sender.name //we put the name of the sender, not their id
          //   );
          //   this._messages.push(message);
          // });
          this._messages = messages;
          this.addMessageEvent.emit(this._messages);
          // this.messageListChangedEvent.next(this._messages);
        },
        (error) => {
          console.log(error);
        }
      );

    return this._messages;
  }

  getMaxId(): number {
    let maxId = 0;

    this._messages.forEach((message) => {
      let currentId = Number(message.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  storeMessages() {
    const messagesString = JSON.stringify(this._messages);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .put(
        'https://wdd430-e9605-default-rtdb.firebaseio.com/messages.json',
        messagesString,
        { headers }
      )
      .subscribe(() => {
        this.addMessageEvent.emit(this._messages);
      });
  }
  addMessage(newMessage: Message) {
    if (!!document) {
      this.maxMessageId = this.getMaxId();
      this.maxMessageId++;
      newMessage.id = this.maxMessageId;
      this._messages.push(newMessage);
      this.storeMessages();
    }
  }

  getMessage(id: number): Message {
    let message = this.getMessages().filter((message: Message) => {
      return message.id == id;
    })[0];
    return message;
  }

  //This function returns the index of an item with a certain id
  findDocumentIndex(messages: Message[], id: string): number {
    return messages.findIndex((message) => message.id.toString() === id);
  }
}
