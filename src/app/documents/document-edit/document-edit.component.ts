import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent {
  documentFormGroup!: FormGroup;
  editMode = false;
  documentToEdit: Document = new Document();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private documentService: DocumentsService,
    private theRouter: Router
  ) {}

  ngOnInit() {
    this.documentFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      url: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      let id = params['id'];

      //if the id is not null
      //then its ediitg mode
      if (!!id) {
        let document = this.documentService.getDocument(id);
        //if the document exists
        if (!!document) {
          this.editMode = true;
          this.documentToEdit = document;

          //populate the form
          this.documentFormGroup.patchValue({
            title: document.getName(),
            description: document.getDescription(),
            url: document.getURL(),
          });
        }
      }
      //else its add new document mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.documentFormGroup.valid) {
      let id = '';
      let name = this.documentFormGroup.controls['title'].value;
      let description = this.documentFormGroup.controls['description'].value;
      let url = this.documentFormGroup.controls['url'].value;

      let newDocument = new Document(id, name, description, url);
      //if in edit mode
      if (this.editMode) {
        this.documentService.updateDocument(this.documentToEdit, newDocument);
        this.theRouter.navigateByUrl('/documents');
      }
      //else if in new document mode
      else {
        this.documentService.addDocument(newDocument);
        this.theRouter.navigateByUrl('/documents');
      }
    }
  }
}
