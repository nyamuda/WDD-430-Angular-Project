import { Component, Output, EventEmitter } from '@angular/core';
import { randomDocuments } from '../utils/utils';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  documents: Array<Document> = new Array<Document>();
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  ngOnInit() {
    //add some random documents to the documents Array
    randomDocuments().forEach((element) => {
      //new document
      let newDocument: Document = new Document(
        element.id,
        element.name,
        element.description,
        element.url
      );
      this.documents.push(newDocument);
    });
  }

  //on selecting a document
  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
