import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contacts: Array<Contact> = [];
  subscription: Subscription = new Subscription();

  constructor(private contactsService: ContactsService) {}
  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.subscription = this.contactsService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
