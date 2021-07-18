import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  // documents: Observable<string[]>;
  // currentDoc: string;
  // private _docSub: Subscription;


  // constructor(private documentService: ChatService) { }

  // ngOnInit(): void {
  //   this.documents = this.documentService.documents;
  //   this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
  // }

  // ngOnDestroy() {
  //   this._docSub.unsubscribe();
  // }

  // loadDoc(id: string) {
  //   this.documentService.getDocument(id);
  // }

  // newDoc() {
  //   this.documentService.newDocument();
  // }

}
