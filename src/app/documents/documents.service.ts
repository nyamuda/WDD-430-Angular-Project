import { Injectable, Output, EventEmitter } from '@angular/core';
import { randomDocuments } from './utils/utils';
import { fetchedDocument } from './utils/utils';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private _documents: Array<Document> = new Array<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();

  getDocuments(): Array<Document> {
    if (this._documents.length === 0) {
      randomDocuments().forEach((data: fetchedDocument) => {
        let document: Document = new Document(
          data.id,
          data.name,
          data.description,
          data.url
        );

        this._documents.push(document);
      });
    }

    return this._documents;
  }

  getDocument(id: number): Document {
    let document = this.getDocuments().filter((document: Document) => {
      return Number(document.id) == id;
    })[0];
    return document;
  }
  deleteDocument(document: Document) {
    this._documents = this._documents.filter((element) => {
      return element.id != document.id;
    });
    this.documentChangedEvent.emit(this._documents);
  }
}
