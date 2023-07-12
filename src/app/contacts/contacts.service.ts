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

  //CREATE
  addContact(newContact: Contact) {
    if (!!Contact) {
      this.maxContactId = this.getMaxId();
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this._contacts.push(newContact);

      const url = 'http://localhost:8000/contacts';

      this.http.post(url, newContact).subscribe(
        (response) => {
          console.log(response);
          this.contactListChangedEvent.next(
            this.sortContactsByName(this._contacts)
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  //READ
  getContacts(): Array<Contact> {
    const url = `http://localhost:8000/contacts`;

    this.http.get<Contact[]>(url).subscribe(
      (Contacts: Contact[]) => {
        this._contacts = this.sortContactsByName(Contacts);

        this.contactListChangedEvent.next(this._contacts);
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );

    return this._contacts;
  }

  //UPDATE
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!!originalContact && !!newContact) {
      let pos = this.findContactIndex(this._contacts, originalContact.id);

      if (pos < 0 || pos == null) {
        return;
      }

      newContact.id = originalContact.id;
      this._contacts[pos] = newContact;

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http
        .put('http://localhost:8000/contacts', newContact, { headers })
        .subscribe(() => {
          let sorted = this.sortContactsByName(this._contacts);
          this.contactListChangedEvent.next(sorted);
        });
    }
  }

  //DELETE
  deleteContact(contact: Contact) {
    const url = `http://localhost:8000/contacts/${contact.id}`;

    this.http.delete(url).subscribe(
      () => {
        this._contacts = this._contacts.filter((element) => {
          return element.id != contact.id;
        });

        this.contactListChangedEvent.next(
          this.sortContactsByName(this._contacts)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
