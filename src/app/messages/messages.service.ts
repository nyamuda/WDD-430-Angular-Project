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

  getMessage(id: number): Message {
    let message = this.getMessages().filter((message: Message) => {
      return message.id == id;
    })[0];
    return message;
  }

  //This function returns the index of an item with a certain id
  findMessageIndex(messages: Message[], id: string): number {
    return messages.findIndex((message) => message.id.toString() === id);
  }

  //CREATE
  addMessage(newMessage: Message) {
    if (!!newMessage) {
      this.maxMessageId = this.getMaxId();
      this.maxMessageId++;
      newMessage.id = this.maxMessageId;
      this._messages.push(newMessage);

      const url = 'http://localhost:8000/messages';

      this.http.post(url, newMessage).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  //READ
  getMessages(): Array<Message> {
    const url = `http://localhost:8000/messages`;

    this.http.get<Message[]>(url).subscribe(
      (messages: Message[]) => {
        this._messages = messages;

        this.addMessageEvent.emit(this._messages);
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );

    return this._messages;
  }
}
