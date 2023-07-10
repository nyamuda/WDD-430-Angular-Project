import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent {
  @Input('full-contact') contact!: Contact;
  @Input('showImage') showImage: boolean = true;
}
