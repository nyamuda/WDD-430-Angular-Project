import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { fetchedContact } from '../api-contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contacts: Array<Contact> = new Array<Contact>();
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  ngOnInit() {
    // create a contact and add it to the contacts array
    this.randomData.forEach((data: fetchedContact) => {
      let contact: Contact = new Contact(
        data.id,
        data.name,
        data.email,
        data.phone,
        data.imageUrl,
        data.group
      );

      this.contacts.push(contact);
    });
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

  randomData = [
    {
      id: 1,

      name: 'R. Kent Jackson',

      email: 'jacksonk@byui.edu',

      phone: '208-496-3771',

      imageUrl: '../../assets/images/jacksonk.jpg',

      group: null,
    },
    {
      id: 2,

      name: 'Rex Barzee',

      email: 'barzeer@byui.edu',

      phone: '208-496-3768',

      imageUrl: '../../assets/images/barzeer.jpg',

      group: null,
    },
  ];
}
