import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { randomData } from './utils/utils';
import { fetchedContact } from './utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _contacts: Array<Contact> = new Array<Contact>();
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  //get all contacts
  getContacts(): Array<Contact> {
    this._contacts = [];
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

    return this._contacts;
  }

  //get contact by id
  getContact(id: number): Contact {
    let contact: Contact = this.getContacts().filter((data: Contact) => {
      return data.getId() == id;
    })[0];

    return contact;
  }
}
