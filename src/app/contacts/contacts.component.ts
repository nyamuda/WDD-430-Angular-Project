import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  //the contact from the child component -- contact-list
  contact!: Contact;

  setContact(contact: Contact) {
    this.contact = contact;
  }

  getContact(): Contact {
    return this.contact;
  }
}
