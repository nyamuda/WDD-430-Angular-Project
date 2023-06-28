import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent {
  contact!: Contact;

  constructor(
    private router: Router,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.contact = this.contactsService.getContact(id);
    });
  }

  onDelete(contact: Contact) {
    this.contactsService.deleteContact(contact);
    this.router.navigateByUrl('/contacts');
  }
}
