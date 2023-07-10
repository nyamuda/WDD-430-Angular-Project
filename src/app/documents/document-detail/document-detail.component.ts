import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent {
  document!: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentsService,
    private route: ActivatedRoute,
    private windowRefService: WindRefService,
    private theRouter: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  deleteDocument(document: Document) {
    this.documentService.deleteDocument(document);
    this.theRouter.navigate(['/documents']);
  }
}
