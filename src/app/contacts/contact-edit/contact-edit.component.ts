import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent {
  contactForm!: FormGroup;
  editMode = false;
  originalContact: Contact = new Contact();
  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';
  phonePattern = 'D*([2-9]d{2})(D*)([2-9]d{2})(D*)(d{4})D*';
  groupContacts = new Array<Contact>();
  isGroupError = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private theRouter: Router
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.pattern(this.phonePattern)],
      imgURL: [''],
      group: [],
    });

    this.route.params.subscribe((params) => {
      let id = params['id'];

      //if the id is not null
      //then its ediitg mode
      if (!!id) {
        let contact = this.contactService.getContact(id);
        //if the document exists
        if (!!document) {
          this.editMode = true;
          this.originalContact = contact;
          //populate the form
          this.contactForm.patchValue({
            name: contact.name,
            email: contact.getEmail(),
            imgURL: contact.imageURL,
          });
        }
      }
      //else its add new document mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.contactForm.valid) {
      let id = '';
      let name = this.contactForm.controls['name'].value;
      let email = this.contactForm.controls['email'].value;
      let phone = this.contactForm.controls['phone'].value;
      let imgURL = this.contactForm.controls['imgURL'].value;

      let newContact = new Contact(
        id,
        name,
        email,
        phone,
        imgURL,
        this.groupContacts
      );
      //if in edit mode
      if (this.editMode) {
        this.contactService.updateContact(this.originalContact, newContact);
        this.theRouter.navigateByUrl('/contacts');
      }
      //else if in new document mode
      else {
        this.contactService.addContact(newContact);
        this.theRouter.navigateByUrl('/contacts');
      }
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.theRouter.navigateByUrl('/contacts');
  }

  isEmailInvalid(): boolean {
    let email =
      (this.contactForm.get('email')?.invalid &&
        this.contactForm.get('email')?.untouched) ||
      this.contactForm.get('email')?.value == '';

    let isValid: boolean = !!email;

    return isValid;
  }

  isNameInvalid(): boolean {
    let name =
      (this.contactForm.get('name')?.invalid &&
        this.contactForm.get('name')?.untouched) ||
      this.contactForm.get('name')?.value == '';

    let isValid: boolean = !!name;

    return isValid;
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.originalContact && newContact.id === this.originalContact.id) {
      this.isGroupError = true;
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        this.isGroupError = true;
        return true;
      }
    }
    this.isGroupError = false;
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(id: string) {
    this.groupContacts = this.groupContacts.filter((contact) => {
      return contact.id != id;
    });
  }
}
