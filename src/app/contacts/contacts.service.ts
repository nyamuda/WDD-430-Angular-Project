import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { randomData } from './utils/utils';
import { fetchedContact } from './utils/utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _contacts: Array<Contact> = new Array<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;

  constructor() {
    this.maxContactId = this.getMaxId();
  }

  //get all contacts
  getContacts(): Array<Contact> {
    if (this._contacts.length === 0) {
      //loop the contacts data from an API or backend
      randomData.forEach((data: fetchedContact) => {
        let contact: Contact = new Contact(
          data.id,
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
  getContact(id: string): Contact {
    let contact: Contact = this.getContacts().filter((data: Contact) => {
      return data.id == id;
    })[0];

    return contact;
  }

  getMaxId(): number {
    let maxId = 0;

    this._contacts.forEach((contact) => {
      let currentId = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addContact(newContact: Contact) {
    if (!!newContact) {
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this._contacts.push(newContact);
      this.contactListChangedEvent.next(this._contacts);
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!!originalContact && !!newContact) {
      let pos = this._contacts.indexOf(originalContact);
      if (pos < 0) {
        return;
      }
      newContact.id = originalContact.id;
      this._contacts[pos] = newContact;

      this.contactListChangedEvent.next(this._contacts);
    }
  }

  deleteContact(contact: Contact) {
    this._contacts = this._contacts.filter((element) => {
      return element.id != contact.id;
    });

    this.contactListChangedEvent.next(this._contacts);
  }
}
