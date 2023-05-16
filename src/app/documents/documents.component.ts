import { Component } from '@angular/core';
import { randomDocuments } from './utils/utils';
import { Document } from './document.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent {
  selectedDocument!: Document;

  setSelectedDocument(document: Document): void {
    this.selectedDocument = document;
  }

  getSelectedDocument(): Document {
    return this.selectedDocument;
  }
}
