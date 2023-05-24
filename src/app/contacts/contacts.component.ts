import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  //the contact from the child component -- contact-list
  contact!: Contact;

  constructor(private contactService: ContactsService) {}

  ngOnInit() {
    this.contactService.selectedContactEvent.subscribe(
      (contact) => (this.contact = contact)
    );
  }

  getContact(): Contact {
    return this.contact;
  }
}
