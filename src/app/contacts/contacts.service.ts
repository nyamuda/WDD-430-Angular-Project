import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { randomData } from './utils/utils';
import { fetchedContact } from './utils/utils';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _contacts: Array<Contact> = new Array<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  //get all contacts

  //Get contacts from the database
  getContacts(): Array<Contact> {
    this.http
      .get<Contact[]>(
        'https://wdd430-e9605-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this._contacts = this.sortContactsByName(contacts);
          this.contactListChangedEvent.next(this._contacts);
        },
        (error) => {
          console.log(error);
        }
      );

    return this._contacts;
  }

  storeContacts() {
    const contactsString = JSON.stringify(this._contacts);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .put(
        'https://wdd430-e9605-default-rtdb.firebaseio.com/contacts.json',
        contactsString,
        { headers }
      )
      .subscribe(() => {
        let sorted = this.sortContactsByName(this._contacts);
        this.contactListChangedEvent.next(sorted);
      });
  }

  //get contact by id
  getContact(id: string): Contact {
    if (this._contacts.length == 0) {
      this.getContacts();
    }

    let contact: Contact = this._contacts.filter((data: Contact) => {
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
      this.maxContactId = this.getMaxId();
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this._contacts.push(newContact);
      this.storeContacts();
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!!originalContact && !!newContact) {
      let pos = this.findContactIndex(this._contacts, originalContact.id);
      if (pos < 0 || pos == null) {
        return;
      }
      newContact.id = originalContact.id;
      this._contacts[pos] = newContact;

      this.storeContacts();
    }
  }

  deleteContact(contact: Contact) {
    this._contacts = this._contacts.filter((element) => {
      return element.id != contact.id;
    });

    this.storeContacts();
  }

  //This function returns the index of an item with a certain id
  findContactIndex(contacts: Contact[], id: string): number {
    return contacts.findIndex((contact) => contact.id === id);
  }

  sortContactsByName(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
