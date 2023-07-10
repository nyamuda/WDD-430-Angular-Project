import { Injectable, Output, EventEmitter } from '@angular/core';
import { randomDocuments } from './utils/utils';
import { fetchedDocument } from './utils/utils';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private _documents: Array<Document> = new Array<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId!: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = 0;
  }

  //Get documents from the database
  getDocuments(): Array<Document> {
    this.http
      .get<Document[]>(
        'https://wdd430-e9605-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this._documents = this.sortDocumentsByName(documents);
          console.log(this._documents);
          this.documentListChangedEvent.next(this._documents);
        },
        (error) => {
          console.log(error);
        }
      );

    return this._documents;
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this._documents);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .put(
        'https://wdd430-e9605-default-rtdb.firebaseio.com/documents.json',
        documentsString,
        { headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this._documents);
      });
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
    this.storeDocuments();
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
      this.storeDocuments();
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!!originalDocument && !!newDocument) {
      let pos = this.findDocumentIndex(this._documents, originalDocument.id);
      console.log(this._documents);

      if (pos < 0 || pos == null) {
        return;
      }

      newDocument.id = originalDocument.id;
      this._documents[pos] = newDocument;

      this.storeDocuments();
    }
  }

  //This function sorts the documents by name
  sortDocumentsByName(documents: Document[]): Document[] {
    return documents.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  //This function returns the index of an item with a certain id
  findDocumentIndex(documents: Document[], id: string): number {
    return documents.findIndex((doc) => doc.id === id);
  }
}
