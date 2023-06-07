import { Component, Output, EventEmitter } from '@angular/core';
import { randomDocuments } from '../utils/utils';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  documents: Array<Document> = new Array<Document>();
  newDocument = 'new';

  constructor(private documentService: DocumentsService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }
}
