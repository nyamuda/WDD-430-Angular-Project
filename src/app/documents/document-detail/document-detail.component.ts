import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent {
  document!: Document;

  constructor(private documentService: DocumentsService) {}

  ngOnInit() {
    this.documentService.selectedDocumentEvent.subscribe((data) => {
      this.document = data;
    });
  }
}
