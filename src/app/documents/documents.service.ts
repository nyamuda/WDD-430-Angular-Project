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

  getDocument(id: number): Document {
    let document = this.getDocuments().filter((document: Document) => {
      return Number(document.id) == id;
    })[0];
    return document;
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

  //CREATE
  addDocument(newDocument: Document) {
    if (!!document) {
      this.maxDocumentId = this.getMaxId();
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this._documents.push(newDocument);

      this.documentListChangedEvent.next(
        this.sortDocumentsByName(this._documents)
      );

      const url = 'http://localhost:8000/documents';

      this.http.post(url, newDocument).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  //READ
  getDocuments(): Array<Document> {
    const url = `http://localhost:8000/documents`;

    this.http.get<Document[]>(url).subscribe(
      (documents: Document[]) => {
        this._documents = this.sortDocumentsByName(documents);

        this.documentListChangedEvent.next(this._documents);
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );

    return this._documents;
  }

  //UPDATE
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!!originalDocument && !!newDocument) {
      let pos = this.findDocumentIndex(this._documents, originalDocument.id);

      if (pos < 0 || pos == null) {
        return;
      }

      newDocument.id = originalDocument.id;
      this._documents[pos] = newDocument;

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http
        .put('http://localhost:8000/documents', newDocument, { headers })
        .subscribe(() => {
          let sorted = this.sortDocumentsByName(this._documents);
          this.documentListChangedEvent.next(sorted);
        });
    }
  }

  //DELETE
  deleteDocument(document: Document) {
    const url = `http://localhost:8000/documents/${document.id}`;

    this.http.delete(url).subscribe(
      () => {
        this._documents = this._documents.filter((element) => {
          return element.id != document.id;
        });

        this.documentListChangedEvent.next(
          this.sortDocumentsByName(this._documents)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
