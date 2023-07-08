import { Injectable, Output, EventEmitter } from '@angular/core';
import { randomDocuments } from './utils/utils';
import { fetchedDocument } from './utils/utils';
import { Document } from './document.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private _documents: Array<Document> = new Array<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId!: number;

  constructor() {
    this.maxDocumentId = 0;
  }

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
    this.documentListChangedEvent.next(this._documents);
  }

  getMaxId(): number {
    let maxId = 0;

    this._documents.forEach((document) => {
      let currentId = Number(document.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!!document) {
      this.maxDocumentId = this.getMaxId();
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this._documents.push(newDocument);
      this.documentListChangedEvent.next(this._documents);
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!!originalDocument && !!newDocument) {
      let pos = this._documents.indexOf(originalDocument);
      if (pos < 0) {
        return;
      }
      newDocument.id = originalDocument.id;
      this._documents[pos] = newDocument;

      this.documentListChangedEvent.next(this._documents);
    }
  }
}
