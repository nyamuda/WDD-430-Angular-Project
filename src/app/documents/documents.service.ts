import { Injectable, Output, EventEmitter } from '@angular/core';
import { randomDocuments } from './utils/utils';
import { fetchedDocument } from './utils/utils';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private _documents: Array<Document> = new Array<Document>();

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  getDocuments(): Array<Document> {
    randomDocuments().forEach((data: fetchedDocument) => {
      let document: Document = new Document(
        data.id,
        data.name,
        data.description,
        data.url
      );

      this._documents.push(document);
    });
    return this._documents;
  }

  getDocument(id: number): Document {
    let document = this.getDocuments().filter((document: Document) => {
      return document.getNumber() == id;
    })[0];
    return document;
  }
}
