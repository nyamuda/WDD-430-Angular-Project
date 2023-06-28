import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { randomData } from './utils/utils';
import { fetchedContact } from './utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _contacts: Array<Contact> = new Array<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();

  //get all contacts
  getContacts(): Array<Contact> {
    if (this._contacts.length === 0) {
      //loop the contacts data from an API or backend
      randomData.forEach((data: fetchedContact) => {
        let contact: Contact = new Contact(
          Number(data.id),
          data.name,
          data.email,
          data.phone,
          data.imageUrl,
          data.group
        );

        this._contacts.push(contact);
      });
    }

    return this._contacts;
  }

  //get contact by id
  getContact(id: number): Contact {
    let contact: Contact = this.getContacts().filter((data: Contact) => {
      return data.id == id;
    })[0];

    return contact;
  }

  deleteContact(contact: Contact) {
    this._contacts = this._contacts.filter((element) => {
      return element.id != contact.id;
    });

    this.contactChangedEvent.emit(this._contacts);
  }
}
